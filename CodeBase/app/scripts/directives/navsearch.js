'use strict';

/**
 * @ngdoc directive
 * @name tekForumApp.directive:NavSearch
 * @description
 * # NavSearch
 */
angular.module('tekForumApp')
  .directive('NavSearch', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the NavSearch directive');
      }
    };
  });
