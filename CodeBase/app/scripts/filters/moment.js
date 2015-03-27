'use strict';

/**
 * @ngdoc filter
 * @name tekForumApp.filter:moment
 * @function
 * @description
 * # moment
 * Filter in the tekForumApp.
 */
angular.module('tekForumApp')
    .filter('moment', function () {
        return function (input) {
            return moment(input).fromNow();
        };
    });