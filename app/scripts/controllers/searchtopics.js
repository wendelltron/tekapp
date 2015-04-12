'use strict';

/**
 * @ngdoc function
 * @name tekApp.controller:SearchtopicsCtrl
 * @description
 * # SearchtopicsCtrl
 * Controller of the tekApp
 */
angular.module('tekForumApp')
    .controller('SearchtopicsCtrl', function ($scope, $location) {
        $scope.query = '';
        $scope.search = function () {
            $location.path('/search/' + $scope.query);
        };
    });