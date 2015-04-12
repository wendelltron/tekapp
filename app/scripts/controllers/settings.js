'use strict';

/**
 * @ngdoc function
 * @name tekApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the tekApp
 */
angular.module('tekForumApp')
    .controller('SettingsCtrl', function ($scope, $http) {
        $http.get('JSON/settings/defaults.json')
           .then(function(res){
                $scope.prefs = res.data;                
            });
    });