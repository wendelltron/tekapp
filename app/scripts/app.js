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
    'angular-flash.flash-alert-directive',
    'toggle-switch'
  ])
    .config(function ($routeProvider, localStorageServiceProvider, flashProvider, $httpProvider) {
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
            .when('/profile', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/search/:query', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/notifications', {
                templateUrl: 'views/notifications.html',
                controller: 'NotificationsCtrl'
            })
            .when('/searchTopics', {
                templateUrl: 'views/searchtopics.html',
                controller: 'SearchtopicsCtrl'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        localStorageServiceProvider.setPrefix('TekForum');
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfCookieName = '_t';
    }).run(function ($rootScope, $location) {
        $rootScope.$watch(function () {
                return $location.path();
            },
            function (a) {
                $('.canvas-slid').offcanvas('hide');
            });
    });