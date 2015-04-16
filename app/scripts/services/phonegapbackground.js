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
    .service('PhoneGapBackground', function ($interval, FactoryOnscreenNotifications) {
        var exportBackground = {};
        window.onload = function () {
            document.addEventListener('online', exportBackground.monitorConnection, false);
            document.addEventListener('offline', exportBackground.monitorConnection, false);
            if(navigator.network.connection.type === Connection.NONE) {
                $Phonegap.connection = null;
                FactoryOnscreenNotifications.add(0);
            }
            else {
                $Phonegap.connection = true;
                FactoryOnscreenNotifications.remove(0);
            }
        };
        exportBackground.monitorConnection = function (e) {
            if(e.type === 'offline') {
                $Phonegap.connection = null;
                FactoryOnscreenNotifications.add(0);
            } else {
                $Phonegap.connection = true;
                FactoryOnscreenNotifications.remove(0);
            }
        };
        return exportBackground;
    });