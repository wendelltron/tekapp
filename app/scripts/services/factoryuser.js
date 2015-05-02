'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryUser
 * @description
 * # FactoryUser
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryUser', function (FactoryHTTP, ServerAddress) {

        // Public API here
        return {
            getFormID: function () {
                return FactoryHTTP.get('https://teksyndicate.com/user/login');
            },
            login: function (request) {
                return FactoryHTTP.get({
                    method: 'POST',
                    url: 'https://teksyndicate.com/user/login',
                    data: $.param(request),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            },
            get: function (user) {
                return FactoryHTTP.get(ServerAddress + 'users/' + user + '.json');
            }
        };
    });