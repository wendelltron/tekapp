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
                            console.log(navigator);
                            var networkState = navigator.connection.type;

                            if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
                                $Phonegap.connection = null;
                                flash.error('lost connection');
                            } else {
                                $Phonegap.connection = networkState;
                            }

                        }
                    }, 3000)
                }

            }
        }
    });