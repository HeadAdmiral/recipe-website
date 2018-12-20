import * as firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

/**
 * Initializes the connection to Firebase
 * @type {firebase.app.App}
 */
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({
    timestampsInSnapshots: true
});
export default firebaseApp.firestore()