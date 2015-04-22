'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('SearchCtrl', function ($scope, FactoryTopic, $routeParams, FormatHTML) {

        var init = function () {
            $scope.query = $routeParams.query;
            FactoryTopic.search($scope.query).success(function (data) {
                $scope.topics = data.topics;
                $scope.posts = data.posts;
                FormatHTML.format();
                $('.canvas-slid').offcanvas('hide');
            });
        };

        init();
    });