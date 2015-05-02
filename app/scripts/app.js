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
    'toggle-switch',
    'ngFx',
    'duScroll',
    'ngCordova'
  ])
  .config(function ($routeProvider, localStorageServiceProvider, $httpProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .when('/category/:id', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .when('/category/:id/:name', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .when('/about', {
          templateUrl: 'views/about.html'
      })
      .when('/openSourceCredits', {
          templateUrl: 'views/openSourceCredits.html'
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
      .when('/users/:name', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl'
      })
      .when('/searchTopics/:query', {
          templateUrl: 'views/searchtopics.html',
          controller: 'SearchtopicsCtrl'
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
})
  .run(function ($rootScope, $q, $location, FactoryUserStorage, $document, $routeParams, PhoneGap, FactoryOnscreenNotifications, FactoryUser, $timeout) {
    $rootScope.ajaxCall = $q.defer();
    $rootScope.customNav = {
        scope: {}
    };
    $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
        $rootScope.customNav.url = '';
        $rootScope.customNav.scope = {};
        $rootScope.ajaxCall.promise.then(function () {
            $rootScope.HideMenu();
        });
    });
    $rootScope.scrollTop = function () {
        angular.element(document.getElementsByClassName('infinite')).scrollTopAnimated(0, 750);
    };
    $rootScope.scrollBottom = function () {
        angular.element(document.getElementsByClassName('infinite')).scrollToElementAnimated(angular.element(document.getElementById('bottom')), 0, 750);
    };
    PhoneGap.init(function () {
        FactoryUserStorage.init(function () {
            FactoryOnscreenNotifications.init(function() {
                $rootScope.ajaxCall.resolve();
            });
        });
    });
});