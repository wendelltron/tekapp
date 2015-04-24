'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('LoginCtrl', function ($scope, FactoryUser, $cookies, localStorageService, $location, FactoryUserStorage) {
        $scope.user = {
            form_id: 'user_login',
            op: 'Log in'

        };
        $scope.Login = function () {
            FactoryUser.login($scope.user).success(function (data) {
                CookieJar.get(function (data) {
                    console.log(data);
                    var tokens = JSON.parse(data);
                    FactoryUserStorage.user.loggedIn = true;
                    FactoryUserStorage.user.username = $scope.user.name;
                    FactoryUserStorage.user.token = tokens._t;
                    FactoryUserStorage.save();
                    $.each(tokens, function (key, value) {
                        $cookies[key] = value;
                    });
                    //localStorageService.set('user', JSON.stringify($user));
                    FactoryUser.get(false).success(function (data) {
                        console.log(data);
                        FactoryUserStorage.user.profile = data;
                        FactoryUserStorage.save();
                    });
                    $location.path('/');
                }, function () {
                    console.log('fail');
                    console.log(data);
                }, 'https://teksyndicate.com/');
            });
        };
        var init = function () {
            FactoryUser.getFormID().success(function (data) {
                $scope.user.form_build_id = $(data).find('input[name="form_build_id"]').val();
            });
        };

        init();
    });