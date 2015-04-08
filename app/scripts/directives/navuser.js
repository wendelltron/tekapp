'use strict';

/**
 * @ngdoc directive
 * @name tekForumApp.directive:NavUser
 * @description
 * # NavUser
 */
angular.module('tekForumApp')
  .directive('NavUser', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the NavUser directive');
      }
    };
  });
