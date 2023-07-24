import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuPl9Jsu4bB_GMj4yjL4sPiBwzgcE4diM",
  authDomain: "deliveryya-db6ed.firebaseapp.com",
  projectId: "deliveryya-db6ed",
  storageBucket: "deliveryya-db6ed.appspot.com",
  messagingSenderId: "850117728926",
  appId: "1:850117728926:web:10e12600def91a2058398f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default firebase;