var firebase = require("firebase/app")

require("firebase/auth")
require("firebase/database")

var firebaseConfig = {
  apiKey: "AIzaSyDiTPxl0dWBy0_aegVz6Dc43-pcw6usEiE",
  authDomain: "awesome-todo-d3e82.firebaseapp.com",
  databaseURL: "https://awesome-todo-d3e82.firebaseio.com",
  projectId: "awesome-todo-d3e82",
  storageBucket: "awesome-todo-d3e82.appspot.com",
  messagingSenderId: "853385211692",
  appId: "1:853385211692:web:2c39edcc32b080997a4689",
  measurementId: "G-6G21JKQ7PC"
}

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb } 