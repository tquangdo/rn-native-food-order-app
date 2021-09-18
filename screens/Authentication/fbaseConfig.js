import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const FB_CONFIG = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
    measurementId: "xxx"
}
if (!firebase.apps.length) {
    firebase.initializeApp(FB_CONFIG)
}

export const WEB_CLIENT_ID = 'xxx'
export { firebase, auth }