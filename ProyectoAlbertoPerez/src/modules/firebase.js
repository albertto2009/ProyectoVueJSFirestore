//importamos la dependencia de firebase V8
import Firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqIBWaB1kGCC4mZaxTXshzfeeqMf0uXtk",
    authDomain: "proyectoalbertoperez.firebaseapp.com",
    projectId: "proyectoalbertoperez",
    storageBucket: "proyectoalbertoperez.appspot.com",
    messagingSenderId: "839885105498",
    appId: "1:839885105498:web:e86a9decb6ff60bce5eb63",
    measurementId: "G-0DGW6B90QK"
  };

//inicializamos firebase con la configuración de mi proyecto (todolist)
const firebaseApp = Firebase.initializeApp(firebaseConfig)

export const firebaseInst = firebaseApp
export const Auth = firebaseApp.auth()
export const Db = firebaseApp.firestore()

