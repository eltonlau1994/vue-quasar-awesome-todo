import * as firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCiY5vCeoqnnJiv6jaDRGBYGoBRbpYj6Yo",
    authDomain: "awesome-todo-9a00e.firebaseapp.com",
    databaseURL: "https://awesome-todo-9a00e.firebaseio.com",
    projectId: "awesome-todo-9a00e",
    storageBucket: "awesome-todo-9a00e.appspot.com",
    messagingSenderId: "842223252451",
    appId: "1:842223252451:web:cb26958126cdd375"
  };

  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()
  let fireStoreDb = firebaseApp.firestore()

export { firebaseAuth, fireStoreDb }
