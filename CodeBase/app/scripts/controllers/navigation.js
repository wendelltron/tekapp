'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('NavigationCtrl', function ($scope, FactoryTopic, $location) {
        $scope.query = '';
        $scope.search = function () {
            $location.path('/search/' + $scope.query);
        };
        $scope.user = $user;
    });