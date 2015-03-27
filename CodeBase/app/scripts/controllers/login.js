'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('LoginCtrl', function ($scope, FactoryUser) {
        $scope.user = {};
        $scope.Login = function () {
            FactoryUser.login($scope.user).success(function (data) {

            });
        };
    });