'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUser
 * @description
 * # FactoryUser
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryUser', function ($http, ServerAddress) {

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
                return $http.get(ServerAddress + 'users/' + $user.username + '.json');
            }
        };
    });