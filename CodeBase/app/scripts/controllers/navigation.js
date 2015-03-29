'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('NavigationCtrl', function ($scope, FactoryTopic) {
        $scope.query = '';
        $scope.search = function () {
            FactoryTopic.search($scope.query).success(function (data) {
                console.log(data);
            });
        }
    });