'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUserStorage
 * @description
 * # FactoryUserStorage
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryUserStorage', function ($rootScope, $http, $cookies, localStorageService) {
        var userStorage = {};
        userStorage.user = {};
        userStorage.init = function(callback) {
//            console.log('FactoryUserStorage init');
            $http.get('JSON/user/user.json')
                .then(function(res){
                    if (localStorageService.get('user')) {
//                        console.log('FactoryUserStorage user storageExists');
                        userStorage.user = localStorageService.get('user');
                        var diffs = Object.keys(res.data).filter(function(i) {return Object.keys(userStorage.user).indexOf(i) < 0;});
                        var diffsPrefs = [];
                        if (userStorage.user.hasOwnProperty('prefs')) {
//                            console.log('FactoryUserStorage user prefs exists');
                            diffsPrefs = Object.keys(res.data.prefs).filter(function(i) {return Object.keys(userStorage.user.prefs).indexOf(i) < 0;});
                        }
                        if (diffs.length !== 0) {
//                            console.log('FactoryUserStorage user keys no match');
                            angular.forEach(diffs, function (index) {
//                                console.log('FactoryUserStorage user keys no match "' + index + '"');
                                userStorage.user[index] = res.data[index];
                            });
                            localStorageService.set('user', JSON.stringify(userStorage.user));
                        }
                        if (diffsPrefs.length !== 0) {
//                            console.log('FactoryUserStorage user prefs keys no match');
                            angular.forEach(diffsPrefs, function (index) {
//                                console.log('FactoryUserStorage user prefs keys no match "' + index + '"');
                                userStorage.user.prefs[index] = res.data.prefs[index];
                            });
                            localStorageService.set('user', JSON.stringify(userStorage.user));
                        }
                        $cookies._t = userStorage.user.token;
                        callback();
                    }
                    else {
//                        console.log('FactoryUserStorage user NOT storageExists');
                        userStorage.user = res.data;
                        localStorageService.set('user', JSON.stringify(userStorage.user));
                        callback();
                    }
                }
            );
        };
        userStorage.save = function() {
//            console.log('FactoryUserStorage save');
            localStorageService.set('user', JSON.stringify(userStorage.user));
            $rootScope.$broadcast('FactoryUserStorage:update');
//            console.log('broadcast FactoryUserStorage:update');
        };
        return userStorage;
    });