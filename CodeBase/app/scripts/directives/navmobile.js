'use strict';

/**
 * @ngdoc directive
 * @name tekForumApp.directive:NavMobile
 * @description
 * # NavMobile
 */
angular.module('tekForumApp')
    .directive('navMobile', function () {
        return {
            template: 'views/navmobile.html',
            replace: true
        };
    });