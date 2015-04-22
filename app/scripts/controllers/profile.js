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
//                    console.log(data);
                    if (data.user.bio_cooked) {
                        data.user.bio_cooked = FormatHTML.format(data.user.bio_cooked);
                    }
                    else {
                        data.user.bio_excerpt = FormatHTML.format(data.user.bio_excerpt);
                    }
                    $scope.profile = data;
                    $scope.isUser = false;
                });
            }
        });
    });