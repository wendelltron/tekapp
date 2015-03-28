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
                return $http.post('https://teksyndicate.com/user/login?destination=/newforum?dialog={%22Name%22:%22Login%22}', request);
            }
        };
    });