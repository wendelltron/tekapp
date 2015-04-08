var $Phonegap = {
    deviceReady: false,
    connection: true,
    paused: false,
    myScroll: null,
    /**
     * Called when device is ready, and sets ready flag to true
     **/
    onDeviceReady: function () {
        $Phonegap.deviceReady = true;
        document.addEventListener("pause", $Phonegap.pausedDevice, false);
        document.addEventListener("resume", $Phonegap.resumedDevice, false);
    },
    pausedDevice: function () {
        $Phonegap.paused = true;
    },
    resumedDevice: function () {
        $Phonegap.paused = false;
    }

};
// Wait for device API libraries to load
//
document.addEventListener("deviceready", $Phonegap.onDeviceReady, false);