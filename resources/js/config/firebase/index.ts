import * as firebase from 'firebase/app';
import 'firebase/auth';

let testFirebaseConfig = {
    apiKey: 'AIzaSyAufMgaMF83jMWGeOOOCwM8BOviFGxrTDo',
    authDomain: 'test-31133.firebaseapp.com',
    databaseURL: 'https://test-31133.firebaseio.com',
    projectId: 'test-31133',
    storageBucket: '',
    messagingSenderId: '682939863005',
    appId: '1:682939863005:web:48335bc74877619b',
};

var firebaseConfig = {
    apiKey: 'AIzaSyBacBqv4BhrL2gN-lKeNHDcqE3fkeEMJ38',
    authDomain: 'ourspace-1540547695765.firebaseapp.com',
    databaseURL: 'https://ourspace-1540547695765.firebaseio.com',
    projectId: 'ourspace-1540547695765',
    storageBucket: 'ourspace-1540547695765.appspot.com',
    messagingSenderId: '382752142578',
    appId: '1:382752142578:web:60c7fca3a806ca1c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
