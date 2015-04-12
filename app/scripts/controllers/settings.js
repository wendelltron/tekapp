'use strict';

/**
 * @ngdoc function
 * @name tekApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the tekApp
 */
angular.module('tekApp')
  .controller('SettingsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
