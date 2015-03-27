// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    setInterval(checkConnection(), 3000);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
        console.log('lost connection')
    }
}