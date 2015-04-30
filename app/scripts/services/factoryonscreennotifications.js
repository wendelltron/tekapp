 'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryOnscreenNotifications
 * @description
 * # FactoryOnscreenNotifications
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
  .factory('FactoryOnscreenNotifications', function ($http, $filter) {
      var onscreenExport = {};
      onscreenExport.shown = [];
      onscreenExport.list = [];
      onscreenExport.init = function(callback) {
//        console.log('FactoryOnscreenNotifications init');
        $http.get('JSON/notifications/onscreen.json')
            .then(function(res){
                onscreenExport.list = res.data;
//                console.log(onscreenExport.list);
                callback();
            });
      };
      onscreenExport.get = function(id, shown) {
            var list = (shown === true ? onscreenExport.shown : onscreenExport.list);
            var found = $filter('filter')(list, {id: id}, true);
            if (found.length !== 0) {
                return found[0];
            }
            else {
                return false;
            }
      };
      onscreenExport.add = function(id) {
//            console.log('adding ' + id);
            var check = onscreenExport.get(id, true);
            if (!check) {
                onscreenExport.shown.push(onscreenExport.get(id, false));
            }
//            console.log(onscreenExport.shown);
      };
      onscreenExport.remove = function(id) {
//            console.log('removing ' + id);
            var check = onscreenExport.get(id, true);
            if (check !== false) {
//              console.log('removed ' + id);
              onscreenExport.shown.splice(onscreenExport.shown.indexOf(check), 1);
            }
//            console.log(onscreenExport.shown);
      };
      return onscreenExport;
  });
