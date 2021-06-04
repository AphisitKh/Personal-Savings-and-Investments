import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAJBatdEqnXprOp5NTzKJiWGDz4VS0FXGU",
    authDomain: "fir-and-i-90684.firebaseapp.com",
    databaseURL: "https://fir-and-i-90684-default-rtdb.firebaseio.com",
    projectId: "fir-and-i-90684",
    storageBucket: "fir-and-i-90684.appspot.com",
    messagingSenderId: "933723844291",
    appId: "1:933723844291:web:1541cb45081c1aa2ba7c76",
    measurementId: "G-CSY72TWB9K"
};

let app = firebase.initializeApp(config);

export const dbcon = app.database();
export const authcon = app.auth();