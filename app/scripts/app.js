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
    'toggle-switch',
    'ngFx',
    'ionic',
    'ngCordova'
  ])
    .config(function ($stateProvider, localStorageServiceProvider, flashProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "views/right-control.html",
                controller: 'NavigationCtrl'
            })
            .state('app.main', {
                url: '/',
                views: {
                    'menuContent': {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.category.single', {
                url: '/category/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                views: {
                    'menuContent': {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })
            .state('app.topic.single', {
                url: '/topic/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'views/topic.html',
                        controller: 'TopicCtrl'
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'views/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'views/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })
            .state('app.search', {
                url: '/search/:query',
                views: {
                    'menuContent': {
                        templateUrl: 'views/search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })
            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'views/notifications.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })
            .state('app.searchTopics', {
                url: '/searchTopics',
                views: {
                    'menuContent': {
                        templateUrl: 'views/searchtopics.html',
                        controller: 'SearchtopicsCtrl'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'views/settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
        localStorageServiceProvider.setPrefix('TekForum');
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfCookieName = '_t';
        flashProvider.successClassnames.push('alert-success');
        flashProvider.infoClassnames.push('alert-info');
        flashProvider.warnClassnames.push('alert-warning');
        flashProvider.errorClassnames.push('alert-danger');
    }).run(function ($rootScope, $q, $location, FactoryUserStorage, $stateParams, $anchorScroll, PhoneGap, FactoryOnscreenNotifications, FactoryUser, $timeout) {
        $rootScope.ajaxCall = $q.defer();
        $rootScope.$on('$stateChangeSuccess', function (newRoute, oldRoute) {
            $location.hash($stateParams.scrollTo);
            $anchorScroll();
            $timeout(function () {
                $('.canvas-slid').offcanvas('hide');
            }, 450);
        });
        FactoryUserStorage.init(function () {
            FactoryUser.getAvatar();
            FactoryOnscreenNotifications.init(function () {
                PhoneGap.init();
                $rootScope.ajaxCall.resolve();
            });
        });
    });