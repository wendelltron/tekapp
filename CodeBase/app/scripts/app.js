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
    'infinite-scroll',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
  ])
    .config(function ($routeProvider, localStorageServiceProvider, flashProvider) {
        flashProvider.successClassnames.push('alert-success');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.errorClassnames.push('alert-danger');
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/category/:id', {
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
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/search/:query', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        localStorageServiceProvider.setPrefix('TekForum');
    }).run(function ($rootScope, $location) {
        $rootScope.$watch(function () {
                return $location.path();
            },
            function (a) {
                $('.collapse').collapse('hide');
            });
    });