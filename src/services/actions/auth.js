import { auth } from 'services/firebase';

export const login = (user, password) => {
  return auth.signInWithEmailAndPassword(user + '@unal.edu.co', password);
}

export const signOut = () => {
  console.log("signing out");
  return auth.signOut();
}

export const sendPasswordLink = (email) => {
  return auth.sendPasswordResetEmail(email);
}
