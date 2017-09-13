const firebase = require('firebase');
const config = {
	apiKey: "AIzaSyAgfYibGQ6G_vzwNJkyl5GLU_fepDGLdas",
	authDomain: "prism-d2f60.firebaseapp.com",
	databaseURL: "https://prism-d2f60.firebaseio.com",
	projectId: "prism-d2f60",
	storageBucket: "prism-d2f60.appspot.com",
	messagingSenderId: "326084561023"
};
firebase.initializeApp(config);

module.exports = firebase;
