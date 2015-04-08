'use strict';

/**
 * @ngdoc directive
 * @name tekForumApp.directive:NavOther
 * @description
 * # NavOther
 */
angular.module('tekForumApp')
  .directive('NavOther', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the NavOther directive');
      }
    };
  });
