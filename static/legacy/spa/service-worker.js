importScripts("precache-manifest.ac3adacffd7c36e14ab9bb0cb8c739e5.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "iu7"});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});



// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object


// const firebaseConfig = {
//     apiKey: "AIzaSyDCd1txzVZ5JOTrT4M_RTKUwYOJ_tqLzsY",
//     authDomain: "dynamic-chiller-215520.firebaseapp.com",
//     databaseURL: "https://dynamic-chiller-215520.firebaseio.com",
//     projectId: "dynamic-chiller-215520",
//     storageBucket: "dynamic-chiller-215520.appspot.com",
//     messagingSenderId: "355899234212",
//     appId: "1:355899234212:web:259a220b646d6e4a6d9331"
// };
// firebase.initializeApp(firebaseConfig);
//
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
//
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BGHZxlyBQZHhYKM_u0r8hO8yh55gE1eW-q9eOLXhobtFTJZps8tVSEtB1Rz9lNblBHqvZzMnnHgRVprGmmjbRMU");
//
// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/statics/icons/icon-192x192.png'
//     };
//
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });




importScripts("https://js.pusher.com/beams/service-worker.js");


