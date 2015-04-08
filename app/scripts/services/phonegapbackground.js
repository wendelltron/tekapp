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
    .service('PhoneGapBackground', function ($interval, flash) {
        var running = false;
        // AngularJS will instantiate a singleton by calling "new" on this function
        return {
            monitorConnection: function () {
                if (!running) {
                    running = true;
                    $interval(function () {
                        if ($Phonegap.deviceReady) {
                            var networkState = navigator.connection.type || null;

                            // check the connection type, if it is unknown or no connection exist, throw error notification that the connection was lost
                            if (networkState === Connection.NONE || networkState === Connection.UNKNOWN || !networkState) {
                                $Phonegap.connection = null;
                                flash.error = $flash_notifications.error.connection;
                            } else {
                                $Phonegap.connection = true;
                            }

                        }
                    }, 3000);
                }

            }
        };
    });