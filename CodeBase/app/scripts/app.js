'use strict';

/**
 * @ngdoc overview
 * @name tekForumApp
 * @description
 * # tekForumApp
 *
 * Main module of the application.
 */
angular
    .module('tekForumApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'infinite-scroll'
  ])
    .config(function ($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/:id', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/topic/:id', {
                templateUrl: 'views/topic.html',
                controller: 'TopicCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        localStorageServiceProvider.setPrefix('TekForum');
    });