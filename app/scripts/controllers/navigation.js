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
      $scope.ajaxCall.promise.then(function() {
          // listen for android options button
          
          $scope.nav = $rootScope.customNav;
          $scope.routeParams = $routeParams;
          $scope.menuVisible = false;
          $scope.user = FactoryUserStorage.user;
          $scope.alerts = FactoryOnscreenNotifications.shown;
          $scope.closeAlert = function(id) {
              FactoryOnscreenNotifications.remove(id);
          };
          
          /**
           * Reveals the off canvas menu
           * @method ShowMenu
           **/
          $scope.ShowMenu = function () {
              if (!$scope.menuVisible) {
                  $('#right-menu').offcanvas('show');
              }
          };

          /**
           * Hides the off canvas menu, if open, otherwise navigate back
           * @method SwipeRight
           **/
          $scope.SwipeRight = function () {
              if ($scope.menuVisible) {
                  $('#right-menu').offcanvas('hide');
              } else {
                  window.history.back();
              }
          };
          
          /**
           * Toggles the off canvas menu
           * @method ToggleMenu
           **/
          $scope.ToggleMenu = function () {
              $('#right-menu').offcanvas('toggle');
          };

          // Bind events for navigating through the app
          $('#right-menu').on('show.bs.offcanvas', function () {
              $scope.menuVisible = true;
          });
          $('#right-menu').on('hide.bs.offcanvas', function () {
              $scope.menuVisible = false;
          });


          document.addEventListener('menubutton', $scope.ToggleMenu, false);
    });
    });