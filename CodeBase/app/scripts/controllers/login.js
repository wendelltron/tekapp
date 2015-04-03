'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('LoginCtrl', function ($scope, FactoryUser, $cookies, localStorageService, $location) {
        $scope.user = {
            form_id: 'user_login',
            op: 'Log in'

        };
        $scope.Login = function () {
            FactoryUser.login($scope.user).success(function (data) {
                CookieJar.get(function (data) {
                    console.log('success');
                    var tokens = JSON.parse(data);
                    $user.loggedIn = true;
                    $user.token = tokens._t;
                    $cookies._t = tokens._t;
                    localStorageService.set('user', JSON.stringify($user));
                    $location.path('/');
                }, function () {
                    console.log('fail');
                    console.log(data);
                }, "https://teksyndicate.com/");
            });
        };
        var init = function () {
            FactoryUser.getFormID().success(function (data) {
                $scope.user.form_build_id = $(data).find('input[name="form_build_id"]').val();
            });
        };

        init();
    });