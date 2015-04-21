'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('ProfileCtrl', function ($scope, $routeParams, FactoryUserStorage, FactoryUser, FormatHTML) {
        $scope.ajaxCall.promise.then(function() {
            if ($routeParams.name === FactoryUserStorage.user.username || !$routeParams.name) {
                $scope.profile = FactoryUserStorage.user.profile;
                $scope.isUser = true;
                FormatHTML.format();
            }
            else {
                FactoryUser.get($routeParams.name).success(function (data) {
                    console.log(data);
                    $scope.profile = data;
                    $scope.isUser = false;
                    FormatHTML.format();
                });
            }
        });
    });