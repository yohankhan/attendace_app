import Firebase from 'firebase';

var Config = {
	apiKey: 'AIzaSyD_j-SxjH9KIrhOc4D0nadBEaaSILY2_EA',
	authDomain: 'attendance-d0738.firebaseapp.com',
	databaseURL: 'https://attendance-d0738.firebaseio.com',
	projectId: 'attendance-d0738',
	storageBucket: 'attendance-d0738.appspot.com',
	messagingSenderId: '929076871718',
	appId: '1:929076871718:web:3fe600b60354306ab65ce7',
	measurementId: 'G-W6QR8D8QNB'
};
// Initialize Firebase
let app = Firebase.initializeApp(Config);

export const db = app.database();