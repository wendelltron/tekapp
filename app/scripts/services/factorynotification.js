'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryNotification
 * @description
 * # FactoryNotification
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryNotification', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
