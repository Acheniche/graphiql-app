import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQUKBPQSHq3jB-GvcT1vw_v4jmGTrn-Ro",
  authDomain: "fir-auth-graphiql-eb747.firebaseapp.com",
  projectId: "fir-auth-graphiql-eb747",
  storageBucket: "fir-auth-graphiql-eb747.appspot.com",
  messagingSenderId: "976993195537",
  appId: "1:976993195537:web:6be53bb94e5c9e4c1dc3b0",
  measurementId: "G-Q7BJFYV1L8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
