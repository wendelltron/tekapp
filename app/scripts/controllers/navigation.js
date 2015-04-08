'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('NavigationCtrl', function ($scope, FactoryTopic, $location, localStorageService) {
        $scope.query = '';
        $scope.search = function () {
            $location.path('/search/' + $scope.query);
        };
        $scope.logOut = function () {
            localStorageService.remove('user');
            $user.loggedIn = false;
            $user.token = null;
            $user.username = null;
        }
        $scope.user = $user;
    });