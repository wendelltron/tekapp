'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('LoginCtrl', function ($scope, FactoryUser, $cookies, localStorageService) {
        $scope.user = {
            form_id: 'user_login',
            op: 'Log in'

        };
        $scope.Login = function () {
            FactoryUser.login($scope.user).success(function (data) {
                if ($cookies['_t']) {
                    $user.loggedIn = true;
                    $user.token = $cookies['_t'];
                    localStorageService.set('user', JSON.stringify($user));
                    $location.path('/');
                }
            });
        };
        var init = function () {
            FactoryUser.getFormID().success(function (data) {
                $scope.user.form_build_id = $(data).find('input[name="form_build_id"]').val();
            });
        };

        init();
    });