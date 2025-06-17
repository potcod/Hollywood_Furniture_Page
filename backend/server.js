//npm run devStart -- to test server
const express = require('express'); 
const cors = require('cors'); 
const app = express();
app.use(cors());
const firebase_admin = require('firebase-admin');
const port = 5000; // Port number for the server

const serviceAccount = require("./firebaseKey.json");
const admin = firebase_admin.initializeApp({
	credential: firebase_admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


app.get('/', async (req, res) => { // Home page 
    const slideshow = [];

    const querySnapshot = await firestore.collection("home").get();
	querySnapshot.forEach((doc) => {
		
		//Return userID(same as doc name), dislayName, photoURL, and created recipes,
		slideshow.push({ name: doc.get("name"), displayName: doc.get("price"), photoURL: doc.get("photo") });
	});
    console.log("Fetched ( " + slideshow.length + " ) items from Firestore");
	res.status(200).send(slideshow);

    
});

