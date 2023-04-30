// Import the functions you need from the SDKs you need

import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const FirebaseConfig = () => {
console.log("key..............",process.env.API_KEY)
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "logintest-57cf1.firebaseapp.com",
    projectId: "logintest-57cf1",
    storageBucket: "logintest-57cf1.appspot.com",
    messagingSenderId: "1071541860748",
    appId: "1:1071541860748:web:8febce6b91219ff288bea9",
    measurementId: "G-2N6N5M3NWK"
};
    const app = initializeApp(firebaseConfig)
    return {app}
}

export default FirebaseConfig


