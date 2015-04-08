'use strict';

/**
 * @ngdoc directive
 * @name tekForumApp.directive:NavTablet
 * @description
 * # NavTablet
 */
angular.module('tekForumApp')
  .directive('NavTablet', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the NavTablet directive');
      }
    };
  });
