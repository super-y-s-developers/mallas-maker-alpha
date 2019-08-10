import { auth } from 'services/firebase';

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const signOut = () => {
  console.log("signing out");
  return auth.signOut();
}

export const sendPasswordLink = (email) => {
  return auth.sendPasswordResetEmail(email);
}
