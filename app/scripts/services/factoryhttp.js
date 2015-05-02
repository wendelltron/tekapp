'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryHTTP
 * @description
 * # FactoryHTTP
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryHTTP', function ($http, $rootScope) {
    // Using $rootScope instead of PhoneGap service to prevent a circular dependency
    var FactoryHTTP = {};
    FactoryHTTP.get = function(attrs) {
        if (!$rootScope.offline)   {
            return $http.get(attrs);
        }
    };
    return FactoryHTTP;
});