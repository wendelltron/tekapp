'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('NavigationCtrl', function ($scope, FactoryTopic, $location, localStorageService, $swipe) {

        $scope.logOut = function () {
            localStorageService.remove('user');
            $user.loggedIn = false;
            $user.token = null;
            $user.username = null;
        };
        $scope.user = $user;
        $scope.menuVisible = false;


        /**
         * Reveals the off canvas menu
         * @method ShowMenu
         **/
        $scope.ShowMenu = function () {
            if (!$scope.menuVisible) {
                $('#right-menu').offcanvas("show");
            }
        };

        /**
         * Hides the off canvas menu, if open, otherwise navigate back
         * @method SwipeRight
         **/
        $scope.SwipeRight = function () {
            if ($scope.menuVisible) {
                $('#right-menu').offcanvas("hide");
            } else {
                window.history.back();
            }
        };

        // Bind events for navigating through the app
        $('#right-menu').on('show.bs.offcanvas', function () {
            $scope.menuVisible = true;
        });
        $('#right-menu').on('hide.bs.offcanvas', function () {
            $scope.menuVisible = false;
        });
    });