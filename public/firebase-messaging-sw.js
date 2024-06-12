// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA_Qwl9-5Vjlr3AHh5piiPDsMJZFeXHPrw",
    authDomain: "livvy-791d3.firebaseapp.com",
    projectId: "livvy-791d3",
    storageBucket: "livvy-791d3.appspot.com",
    messagingSenderId: "508730217674",
    appId: "1:508730217674:web:ea232c83fd5a6cf2c25033",
    measurementId: "G-45XDPH3GZN"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message');
    console.log(payload);
});

console.log("In service worker");
console.log(Notification.permission);