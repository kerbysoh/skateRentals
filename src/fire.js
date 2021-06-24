import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCUeM7ez4O7iebdK36Ce5I8413_xszkYtg",
    authDomain: "skaterentals-f9589.firebaseapp.com",
    projectId: "skaterentals-f9589",
    storageBucket: "skaterentals-f9589.appspot.com",
    messagingSenderId: "927313284444",
    appId: "1:927313284444:web:2ab295e7abba04c47f0599",
    measurementId: "G-437G2W4WH8"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire