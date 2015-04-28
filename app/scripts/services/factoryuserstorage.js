'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUserStorage
 * @description
 * # FactoryUserStorage
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryUserStorage', function ($rootScope, $http, $cookies, $cordovaFile) {
        var userStorage = {};
        console.log(localStorageService.get('user'));
        userStorage.user = {};

        /**
         * Initializes Userstorage, and fetches user data to save in actie app
         * @method init
         */
        userStorage.init = function (callback) {
            console.log($cordovaFile.readAsDataURL.get(cordova.file.cacheDirectory, 'user.json'));
            //            console.log('FactoryUserStorage init');
            // get default values
            $http.get('JSON/user/user.json')
                .then(function (res) {
                    // try and get preferences from app localstorage
                    $cordovaFile.readAsDataURL.get(cordova.file.cacheDirectory, 'user.json').then(function (success) { // success
                        console.log(success);
                        //                        console.log('FactoryUserStorage user storageExists');
                        // set current variable from local storage
                        /**userStorage.user = localStorageService.get('user');

                        // compare differences between localstorage and local variable on user variable
                        var diffs = Object.keys(res.data).filter(function (i) {
                            return Object.keys(userStorage.user).indexOf(i) < 0;
                        });
                        var diffsPrefs = [];
                        if (userStorage.user.hasOwnProperty('prefs')) {
                            //                            console.log('FactoryUserStorage user prefs exists');
                            diffsPrefs = Object.keys(res.data.prefs).filter(function (i) {
                                return Object.keys(userStorage.user.prefs).indexOf(i) < 0;
                            });
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
                        $cookies._t = userStorage.user.token;**/
                    }, function (error) { // error
                        // localstorage copy has not been create, so create one now
                        userStorage.user = res.data;
                        $cordovaFile.writeFile(cordova.file.cacheDirectory, 'user.json', JSON.stringify(res.data), true).then(function (success) {
                            console.log(success);
                        }, function (error) {
                            console.log(error);
                        })
                    });
                });
        };
        userStorage.save = function () {
            //            console.log('FactoryUserStorage save');
            localStorageService.set('user', JSON.stringify(userStorage.user));
            console.log(localStorageService.get('user'));
            $rootScope.$broadcast('FactoryUserStorage:update');
            //            console.log('broadcast FactoryUserStorage:update');
        };
        return userStorage;
    });