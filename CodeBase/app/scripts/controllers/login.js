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
        $scope.user = {
            form_id: 'user_login',
            op: 'Log in',
            form_build_id: 'form-NLcRw80OhaPysUChROZs9EuZ69FDS7Yz_B4podIzrWg'
        };
        $scope.Login = function () {
            FactoryUser.login($scope.user).success(function (data) {
                console.log(data);
            });
        };
    });