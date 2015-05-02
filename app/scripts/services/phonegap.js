'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.PhoneGap
 * @description
 * # PhoneGap
 * Service in the tekForumApp.
 */
angular.module('tekForumApp')
  .service('PhoneGap', function ($rootScope, FactoryOnscreenNotifications, $location, $cordovaNetwork, $cordovaAppVersion, $cordovaDevice, FactoryUserStorage) {
    var PhoneGap = {
        connection: false,
        connected: true,
        paused: false,
        ready: false,
        offline: false,
        wifiOffline: false
    };
    $rootScope.connected = true;
    $rootScope.paused = false;
    $rootScope.ready = false;
    $rootScope.offline = false;
    $rootScope.wifiOffline = false;
    PhoneGap.init = function (callback) {
//        console.log('PhoneGapInit');
        document.addEventListener('deviceready', function () {
//            console.log('PhoneGapInit device ready');
            PhoneGap.ready = true;
            $rootScope.ready = PhoneGap.ready;
            PhoneGap.connection = $cordovaNetwork.getNetwork();
            PhoneGap.connected = $cordovaNetwork.isOnline();
            $rootScope.connected = PhoneGap.connected;
            
            $rootScope.ajaxCall.promise.then(function () {
                if ($cordovaNetwork.isOnline()) {
//                    console.log('PhoneGapInit online removing connecterror');
                    FactoryOnscreenNotifications.remove(0);
                } else {
                    if (!PhoneGap.offline) {
//                        console.log('PhoneGapInit offline adding connecterror');
                        FactoryOnscreenNotifications.add(0);
                    }
                }
                  PhoneGap.checkOffline();
                  PhoneGap.checkWifi();
            });
            
            $cordovaAppVersion.getAppVersion().then(function (version) {
                $rootScope.appVersion = version;
            });
            $rootScope.appDevice = $cordovaDevice.getDevice();
            $rootScope.appCordova = $cordovaDevice.getCordova();
            $rootScope.appModel = $cordovaDevice.getModel();
            $rootScope.appPlatform = $cordovaDevice.getPlatform();
            $rootScope.appUUID = $cordovaDevice.getUUID();
            $rootScope.appPlatformVersion = $cordovaDevice.getVersion();
            
            $rootScope.$on('FactoryUserStorage:update', function (event, args) {
//                console.log('PhoneGapInit broadcast received');
                PhoneGap.checkOffline();
                PhoneGap.checkWifi();
            }, true);
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
//                console.log('PhoneGapInit online event');
                PhoneGap.connection = networkState;
                PhoneGap.connected = true;
                $rootScope.connected = PhoneGap.connected;
                $rootScope.ajaxCall.promise.then(function () {
                    FactoryOnscreenNotifications.remove(0);
                    PhoneGap.checkWifi();
                });
            });
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
//                console.log('PhoneGapInit offline event');
                PhoneGap.connection = networkState;
                PhoneGap.connected = false;
                $rootScope.connected = PhoneGap.connected;
                $rootScope.ajaxCall.promise.then(function () {
                    FactoryOnscreenNotifications.add(0);
                    PhoneGap.checkWifi();
                });
            });
            document.addEventListener('pause', function (event) {
                // console.log('PhoneGapInit pause event');
                PhoneGap.paused = true;
                $rootScope.paused = PhoneGap.paused;
                $rootScope.ajaxCall.promise.then(function () {
                    PhoneGap.checkWifi();
                });
            }, false);
            document.addEventListener('resume', function (event) {
                // console.log('PhoneGapInit resume event');
                PhoneGap.paused = false;
                $rootScope.paused = PhoneGap.paused;
                $rootScope.ajaxCall.promise.then(function () {
                    PhoneGap.checkWifi();
                });
            }, false);
            document.addEventListener('menubutton', function (event) {
                // console.log('PhoneGapInit menubutton event');
                $rootScope.ajaxCall.promise.then(function () {
                    $rootScope.ToggleMenu();
                });
            }, false);
            document.addEventListener('backbutton', function (event) {
                // console.log('PhoneGapInit backbutton event');
                $rootScope.ajaxCall.promise.then(function () {
                    $rootScope.SwipeRight();
                });
            }, false);
            document.addEventListener('searchbutton', function (event) {
//                console.log('PhoneGapInit searchbutton event');
                $rootScope.ajaxCall.promise.then(function () {
                    $location.path('searchTopics');
                 });
             }, false);
        }, false);
        callback();
    };
    PhoneGap.enableOffline = function () {
//        console.log('enableOffline');
        if (!PhoneGap.offline) {
//            console.log('enableOffline offline false enabling');
            FactoryOnscreenNotifications.remove(0);
            FactoryOnscreenNotifications.add(1);
            PhoneGap.offline = true;
            $rootScope.offline = PhoneGap.offline;
          }
     };
     PhoneGap.disableOffline = function () {
//        console.log('disableOffline');
        if (PhoneGap.offline) {
//            console.log('disableOffline offline true disabling');
            FactoryOnscreenNotifications.remove(1);
            if (!PhoneGap.offline) {
                FactoryOnscreenNotifications.add(0);
            }
            PhoneGap.offline = false;
            $rootScope.offline = PhoneGap.offline;
         }
    };
    PhoneGap.checkOffline = function () {
//        console.log('checkOffline');
        if (FactoryUserStorage.user.prefs.offlineMode) {
//            console.log('checkOffline prefs true enabling');
            PhoneGap.enableOffline();
         } else if (!PhoneGap.wifiOffline) {
//            console.log('checkOffline prefs false disabling');
              PhoneGap.disableOffline();
         }
    };
    PhoneGap.checkWifi = function () {
//        console.log('checkWiFi');
        if (FactoryUserStorage.user.prefs.wifiOnly) {
//            console.log('checkWiFi prefs true');
            if (PhoneGap.connection === Connection.CELL || PhoneGap.connection === Connection.CELL_2G || PhoneGap.connection === Connection.CELL_3G || PhoneGap.connection === Connection.CELL_4G) {
//                console.log('checkWiFi oncell enabling');
                PhoneGap.enableOffline();
                PhoneGap.wifiOffline = true;
                $rootScope.wifiOffline = PhoneGap.wifiOffline;
            } else {
//               console.log('checkWiFi offcell disabling');
               if (!FactoryUserStorage.user.prefs.offlineMode) {
//                    console.log('checkWiFi offcell disabling not offline');
                    PhoneGap.disableOffline();
                    PhoneGap.wifiOffline = false;
                    $rootScope.wifiOffline = PhoneGap.wifiOffline;
                    }
            }
        } else {
//            console.log('checkWiFi prefs false');
            if (!FactoryUserStorage.user.prefs.offlineMode) {
//                console.log('checkWiFi prefs false disabling not offline');
                PhoneGap.disableOffline();
            }
        }
    };
    return PhoneGap;
});