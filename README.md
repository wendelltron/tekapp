#Tek Syndicate App

Built using  Angular, NodeJS, Yeoman, Grunt, and PhoneGap

---

## Building

This app is built with Grunt and PhoneGap. Grunt will move and prepare files from `app` to `www`. Phonegap will create a `platforms` directory and actually create/run/emulate the app.

### Requirements
The following are needed to build the app:

 - [NodeJS](https://nodejs.org/) and [NPM](https://npmjs.com/) [\[Download\]](https://nodejs.org/download/) (NPM is included with NodeJS) *The NodeJS package in the Linux repositories are usually old (like Debian and Ubuntu). Instead, please see [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).*
 - Android SDKs [\[Download\]](https://developer.android.com/sdk/installing/index.html) (other platforms have not been tested, but [you can try](http://docs.phonegap.com/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides))

### Pre-Building
The following NPM libraries must be installed globally:
```
npm install -g node-gyp grunt grunt-cli bower yo generator-karma generator-angular phonegap
```

### Download
Download the latest release from the `master` branch:
```
git clone https://github.com/wendelltron/tekapp.git
```

### Install build dependencies
```
npm install
bower install
```

### Prepare for build
```
grunt build
```

### Build
To build for android:
```
phonegap platform add android
phonegap build android
```

### Emulate (optional)
This will open the Android emulator and automatically start the app:
```
phonegap emulate android
```

### Run (optional)
This will install the Android app to your physical device:
```
phonegap run android
```

## Testing
Currently unsupported (you will receive countless errors, but the app works):
```
grunt default
```

## Help and Support
Feel free to open an issue!

## Development
For anything other than fixing bugs, please ask in an issue first. Nobody wants to do work just to have it rejected.

## Contributors
 - [wendelltron](https://github.com/wendelltron)
 - [jean1880](https://github.com/jean1880)
 - [DaAwesomeP](https://github.com/DaAwesomeP)
