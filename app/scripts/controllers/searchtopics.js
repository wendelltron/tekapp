'use strict';

/**
 * @ngdoc function
 * @name tekApp.controller:SearchtopicsCtrl
 * @description
 * # SearchtopicsCtrl
 * Controller of the tekApp
 */
angular.module('tekForumApp')
    .controller('SearchtopicsCtrl', function ($scope, FactoryTopic, $routeParams, $location) {
    $scope.showTopics = false;    
    $scope.query = '';
        $scope.search = function (query) {
            if (query !== '') {
                $location.url('/searchTopics/' + $scope.query);
            }
        };
        if ($routeParams.query) {
            $scope.query = $routeParams.query;
            $scope.querySearched = $routeParams.query;
            $scope.search($routeParams.query);
            FactoryTopic.search($routeParams.query).success(function (data) {
                $scope.topics = data.topics;
//                console.log(data.topics);
                $scope.posts = data.posts;
                $scope.showTopics = true;
            });
        }
    });