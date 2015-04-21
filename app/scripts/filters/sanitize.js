'use strict';

/**
 * @ngdoc filter
 * @name tekForumApp.filter:Sanitize
 * @function
 * @description
 * # Sanitize
 * Filter in the tekForumApp.
 */
angular.module('tekForumApp')
    .filter('Sanitize', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    });