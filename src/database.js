import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDOFnYlItZlWu4YQkgDqbp2N2bHWjiB8E8",
  authDomain: "web-snaps-823ae.firebaseapp.com",
  databaseURL: "https://web-snaps-823ae.firebaseio.com",
  storageBucket: "web-snaps-823ae.appspot.com",
  messagingSenderId: "386122276648"
}

export default firebase.initializeApp(config)
