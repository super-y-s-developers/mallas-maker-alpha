import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


// Initialize firebase app
import { FirebaseConfig } from "services/firebase/config";
firebase.initializeApp(FirebaseConfig);


// Export database references
export const databaseRef = firebase.database().ref();
export const carreersRef = databaseRef.child("carreers");
export const studentsRef = databaseRef.child("students");
export const subjectTypesRef = databaseRef.child("subjectTypes");
export const subjectsRef = databaseRef.child("subjects");

// Export auth reference
// export const auth = firebase.auth();
