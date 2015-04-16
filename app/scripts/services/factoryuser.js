'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUser
 * @description
 * # FactoryUser
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryUser', function ($http, ServerAddress, FactoryUserStorage) {

        // Public API here
        return {
            getFormID: function () {
                return $http.get('https://teksyndicate.com/user/login');
            },
            login: function (request) {
                return $http({
                    method: 'POST',
                    url: 'https://teksyndicate.com/user/login',
                    data: $.param(request),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            get: function () {
                if(FactoryUserStorage.user.loggedIn) {
                    return $http.get(ServerAddress + 'users/' + FactoryUserStorage.user.username + '.json');
                }
                else {
                    return false;
                }
            },
            getAvatar: function () {
              if(FactoryUserStorage.user.loggedIn) {
                $http.get(ServerAddress + 'users/' + FactoryUserStorage.user.username + '.json').success(function (data) {
                    FactoryUserStorage.user.avatar = ServerAddress + data.user.avatar_template;
                    FactoryUserStorage.save();
                });
              }
              else {
                  return false;
              }
            }
        };
    });