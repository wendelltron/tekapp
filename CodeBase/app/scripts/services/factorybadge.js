'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryBadge
 * @description
 * # FactoryBadge
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryBadge', function () {
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
