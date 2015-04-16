/*jslint node: true */
'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.PhoneGapBackground
 * @description
 * # PhoneGapBackground
 * Service in the tekForumApp.
 */
angular.module('tekForumApp')
    .service('PhoneGapBackground', function ($interval, $rootScope, FactoryOnscreenNotifications, $cordovaNetwork) {
        var exportBackground = {};
        exportBackground.connection = false;
        exportBackground.connected = null;
        exportBackground.init = function() {
            document.addEventListener('deviceready', function () {
                exportBackground.connection = $cordovaNetwork.getNetwork();
                exportBackground.connected = $cordovaNetwork.isOnline();
                if ($cordovaNetwork.isOnline()) { $Phonegap.connection = true;FactoryOnscreenNotifications.remove(0); }
                else { $Phonegap.connection = null;FactoryOnscreenNotifications.add(0); }
                var isOffline = $cordovaNetwork.isOffline();
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                    exportBackground.connection = networkState;
                    exportBackground.connected = true;
                    $Phonegap.connection = true;
                    FactoryOnscreenNotifications.remove(0);
                });
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                    exportBackground.connection = networkState;
                    exportBackground.connected = false;
                    $Phonegap.connection = null;
                    FactoryOnscreenNotifications.add(0);
                });
            }, false);
            exportBackground.monitorConnection = function (e) {
                if(e.type === 'offline') {
                    $Phonegap.connection = null;
                    FactoryOnscreenNotifications.add(0);
                } else {
                    $Phonegap.connection = true;
                    FactoryOnscreenNotifications.remove(0);
                }
            };
        };
        return exportBackground;
    });