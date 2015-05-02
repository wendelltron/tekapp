'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('NavigationCtrl', function ($scope, $rootScope, $routeParams, FactoryUserStorage, FactoryOnscreenNotifications) {
        $scope.ajaxCall.promise.then(function () {
            
            $scope.nav = $rootScope.customNav;
            $scope.routeParams = $routeParams;
            $rootScope.menuVisible = false;
            $scope.user = FactoryUserStorage.user;
            $scope.alerts = FactoryOnscreenNotifications.shown;
            $scope.closeAlert = function (id) {
                FactoryOnscreenNotifications.remove(id);
            };
            
            /**
             * Reveals the off canvas menu
             * @method ShowMenu
             **/
            $rootScope.ShowMenu = function () {
                if (!$rootScope.menuVisible) {
                    $('#right-menu').offcanvas('show');
                }
            };
            
            /**
             * Hides the off canvas menu
             * @method HideMenu
             **/
            $rootScope.HideMenu = function () {
                if ($rootScope.menuVisible) {
                    $('#right-menu').offcanvas('hide');
                }
            };
            
            /**
             * Hides the off canvas menu, if open, otherwise navigate back
             * @method SwipeRight
             **/
            $rootScope.SwipeRight = function () {
                if ($rootScope.menuVisible) {
                    $('#right-menu').offcanvas('hide');
                } else {
                    window.history.back();
                }
            };
            
            /**
             * Toggles the off canvas menu
             * @method ToggleMenu
             **/
            $rootScope.ToggleMenu = function () {
                $('#right-menu').offcanvas('toggle');
            };
            
            // Bind events for navigating through the app
            $('#right-menu').on('show.bs.offcanvas', function () {
                $rootScope.menuVisible = true;
            });
            $('#right-menu').on('hide.bs.offcanvas', function () {
                $rootScope.menuVisible = false;
            });
        });
    });