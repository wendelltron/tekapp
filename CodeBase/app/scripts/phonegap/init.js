// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

var $Phonegap = {
    deviceReady: false,
    connection: true
};
// device APIs are available
//
function onDeviceReady() {
    $Phonegap.deviceReady = true;
}