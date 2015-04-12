'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('ProfileCtrl', function ($scope, FactoryUser, $cookies, localStorageService, $location) {
        return {
            templateUrl: 'views/profile.html',
            replace: true
        };
    });