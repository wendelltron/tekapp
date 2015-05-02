'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryCategory
 * @description
 * # FactoryCategory
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryCategory', function (FactoryHTTP, ServerAddress) {
        // Public API here
        return {
            get: function () {
                return FactoryHTTP.get(ServerAddress + 'categories.json');
            }
        };
    });