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
        return function (input, type) {
            if (type === 'fromNow') {
                return moment(input).fromNow();
            }
            else if (type === 'calendar') {
                return moment(input).calendar();
            }
            else if (type === 'UnixMs') {
                return moment(input).format('x');
           }
        };
    });
