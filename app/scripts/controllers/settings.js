'use strict';

/**
 * @ngdoc function
 * @name tekApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the tekApp
 */
angular.module('tekForumApp')
    .controller('SettingsCtrl', function ($scope, $http, FactoryUserStorage, FactoryOnscreenNotifications) {
        $http.get('JSON/settings/defaults.json')
            .then(function (res) {
                $scope.prefs = res.data;
                $scope.userPrefs = FactoryUserStorage.user.prefs;
                $scope.change = function () {
//                    console.log('SettingsCtrl change()');
                    FactoryUserStorage.user.prefs = $scope.userPrefs;
                    FactoryUserStorage.save();
                };
            });
    });