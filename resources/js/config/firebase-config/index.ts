import firebase from 'firebase/app';

import _FirebaseConfig from './config.json';

const firebaseConfig = _FirebaseConfig;
firebase.initializeApp(firebaseConfig);

export default firebase;
