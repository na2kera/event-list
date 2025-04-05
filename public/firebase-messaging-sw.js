// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBNkU8LK9qcypsgZwHe8SnwzXUSoZJSta8",
  authDomain: "event-list-48d7c.firebaseapp.com",
  projectId: "event-list-48d7c",
  storageBucket: "event-list-48d7c.firebasestorage.app",
  messagingSenderId: "954967738792",
  appId: "1:954967738792:web:85c2d48672e95d3c68b59d",
  measurementId: "G-181188111111",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };
  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
