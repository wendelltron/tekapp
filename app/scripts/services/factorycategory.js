'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryCategory
 * @description
 * # FactoryCategory
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryCategory', function ($http, ServerAddress) {
        // Public API here
        return {
            get: function () {
                return $http.get(ServerAddress + 'categories.json');
            }
        };
    });