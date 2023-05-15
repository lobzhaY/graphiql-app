import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAu8emR1nSieZP3srOkbWPKs6g7kkMxQ6k',
  authDomain: 'graphiql-auth-c3bf2.firebaseapp.com',
  projectId: 'graphiql-auth-c3bf2',
  storageBucket: 'graphiql-auth-c3bf2.appspot.com',
  messagingSenderId: '486996115055',
  appId: '1:486996115055:web:c52f7be9540a5eddba979a',
};

const appFirebase = initializeApp(firebaseConfig);
const authFirebase = getAuth(appFirebase);
const dbFirebase = getFirestore(appFirebase);

const logout = () => {
  signOut(authFirebase);
};

export { authFirebase, logout, dbFirebase };
