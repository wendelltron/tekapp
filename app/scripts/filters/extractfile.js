'use strict';

/**
 * @ngdoc filter
 * @name tekForumApp.filter:ExtractFile
 * @function
 * @description
 * # ExtractFile
 * Filter in the tekForumApp.
 */
angular.module('tekForumApp')
    .filter('ExtractFile', function () {
        return function (input) {
            return input.replace(/^.*[\\\/]/, '');
        };
    });