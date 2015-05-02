'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryStorage
 * @description
 * # FactoryStorage
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryStorage', function ($cordovaFile) {
    var FactoryStorage = {};
    FactoryStorage.set = function(file, data, callback) {
        $cordovaFile.writeFile(file, data, true).then(function (success) {
            console.log(success);
            callback(true, success);
        }, function (error) {
            console.log(error);
            callback(false, error);
        });
    };
    FactoryStorage.getText = function(file, callback) {
        $cordovaFile.readAsText(file).then(function (success) {
            console.log(success);
            callback(true, success);
        }, function (error) {
            console.log(error);
            callback(false, null);
        });
    };
    return FactoryStorage;
});