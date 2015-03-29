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
            login: function (request) {
                return $http.post('https://teksyndicate.com/teksyndicate-test', request);
            }
        };
    });