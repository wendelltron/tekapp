'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUserStorage
 * @description
 * # FactoryUserStorage
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryUserStorage', function ($rootScope, $http, $cookies, FactoryStorage, FactoryUser) {
    var userStorage = {};
    userStorage.user = {};
    
    /**
     * Initializes Userstorage, and fetches user data to save in actie app
     * @method init
     */
    userStorage.init = function (callback) {
//        console.log('FactoryUserStorage init');    
        // get default values
        $http.get('JSON/user/user.json')
          .then(function (res) {
            // try and get preferences from app localstorage
//            if (localStorageService.get('user')) { // OLD BROWSER SUPPORT
            FactoryStorage.getText('user.json', function(success, data) {
                if (success) {
//                    console.log('FactoryUserStorage user storageExists');
//                    userStorage.user = localStorageService.get('user'); // OLD BROWSER SUPPORT
                    userStorage.user = JSON.parse(data);
                    var diffs = Object.keys(res.data).filter(function (i) {
                        return Object.keys(userStorage.user).indexOf(i) < 0;
                    });
                    var diffsPrefs = [];
                    if (userStorage.user.hasOwnProperty('prefs')) {
//                    console.log('FactoryUserStorage user prefs exists');
                        diffsPrefs = Object.keys(res.data.prefs).filter(function (i) {
                            return Object.keys(userStorage.user.prefs).indexOf(i) < 0;
                        });
                    }
                    if (diffs.length !== 0) {
//                    console.log('FactoryUserStorage user keys no match');
                        angular.forEach(diffs, function (index) {
//                        console.log('FactoryUserStorage user keys no match "' + index + '"');
                            userStorage.user[index] = res.data[index];
                        });
                    }
                    if (diffsPrefs.length !== 0) {
//                    console.log('FactoryUserStorage user prefs keys no match');
                        angular.forEach(diffsPrefs, function (index) {
//                        console.log('FactoryUserStorage user prefs keys no match "' + index + '"');
                            userStorage.user.prefs[index] = res.data.prefs[index];
                        });
                    }
                    $cookies._t = userStorage.user.token;
                    if (userStorage.user.loggedIn) {
                        FactoryUser.get(userStorage.user.username).success(function (data) {
//                            console.log(data);
                            userStorage.user.profile = data;
                            userStorage.save(callback);
                        });
                    } else {
                        userStorage.save(callback);
                    }
//                    localStorageService.set('user', JSON.stringify(userStorage.user)); // OLD BROWSER SUPPORT
                    userStorage.save(callback);
                } else {
//                    console.log('FactoryUserStorage user NOT storageExists');
                    userStorage.user = res.data;
//                    localStorageService.set('user', JSON.stringify(userStorage.user)); // OLD BROWSER SUPPORT
                    userStorage.save(callback);
                }
            });
        });
    };
    userStorage.save = function (callback) {
//        console.log('FactoryUserStorage save');
//        localStorageService.set('user', JSON.stringify(userStorage.user)); // OLD BROWSER SUPPORT
        FactoryStorage.set('user.json', JSON.stringify(userStorage.user), function(success, returned) {
            if (success)  {
                $rootScope.$broadcast('FactoryUserStorage:update');
//                console.log('broadcast FactoryUserStorage:update');
                callback();
            } else {
               // error!
            }
        });
    };
    return userStorage;
});