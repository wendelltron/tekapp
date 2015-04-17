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
            $http.get('JSON/user/user.json')
                .then(function(res){
                    if (localStorageService.get('user')) {
                        userStorage.user = localStorageService.get('user');
                        var diffs = Object.keys(res.data).filter(function(i) {return Object.keys(userStorage.user).indexOf(i) < 0;});
                        var diffsPrefs = [];
                        if (userStorage.user.hasOwnProperty('prefs')) {
                          diffsPrefs = Object.keys(res.data.prefs).filter(function(i) {return Object.keys(userStorage.user.prefs).indexOf(i) < 0;});
                        }
                        if (diffs.length !== 0) {
                            angular.forEach(diffs, function (index) {
                                userStorage.user[index] = res.data[index];
                            });
                            localStorageService.set('user', JSON.stringify(userStorage.user));
                        }
                        if (diffsPrefs.length !== 0) {
                            angular.forEach(diffsPrefs, function (index) {
                                userStorage.user.prefs[index] = res.data.prefs[index];
                            });
                            localStorageService.set('user', JSON.stringify(userStorage.user));
                        }
                        $cookies._t = userStorage.user.token;
                        callback();
                    }
                    else {
                      userStorage.user = res.data;
                      localStorageService.set('user', JSON.stringify(userStorage.user));
                      callback();
                    }
                }
            );
        };
        userStorage.save = function() {
            localStorageService.set('user', JSON.stringify(userStorage.user));
            $rootScope.$broadcast('FactoryUserStorage:update');
            console.log('broadcast');
        };
        return userStorage;
    });