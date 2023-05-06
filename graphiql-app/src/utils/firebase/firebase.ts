import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(authFirebase, email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

interface registrationTypes {
  name: string;
  email: string;
  password: string;
}

const registerWithEmailAndPassword = async ({ name, email, password }: registrationTypes) => {
  try {
    const res = await createUserWithEmailAndPassword(authFirebase, email, password);
    const user = res.user;
    await addDoc(collection(dbFirebase, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(authFirebase, email);
    alert('Password reset link sent!');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

const logout = () => {
  signOut(authFirebase);
};

export {
  authFirebase,
  registerWithEmailAndPassword,
  logout,
  dbFirebase,
  sendPasswordReset,
  logInWithEmailAndPassword
};
