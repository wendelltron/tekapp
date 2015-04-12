'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryPost
 * @description
 * # FactoryPost
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryPost', function ($http, ServerAddress) {
        // Public API here
        return {
            get: function (request) {
                return $http.get(ServerAddress + 'posts.json?' + request);
            }
        };
    });