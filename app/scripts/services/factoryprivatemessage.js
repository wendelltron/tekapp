'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryPrivateMessage
 * @description
 * # FactoryPrivateMessage
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryPrivateMessage', function () {
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
