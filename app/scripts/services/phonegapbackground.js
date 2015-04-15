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
                                FactoryOnscreenNotifications.add(0);
                            } else {
                                $Phonegap.connection = true;
                                FactoryOnscreenNotifications.remove(0);
                            }

                        }
                    }, 3000);
                }

            }
        };
    });