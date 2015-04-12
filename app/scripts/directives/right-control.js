'use strict';

/**
 * @ngdoc directive
 * @name tekApp.directive:rightControl
 * @description
 * # rightControl
 */
angular.module('tekForumApp')
    .directive('rightControl', function () {
        return {
            templateUrl: 'views/right-control.html',
            replace: true
        };
    });