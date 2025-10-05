const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

// Only initialize if it hasn't been already
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const firestore = admin.firestore();

module.exports = { admin, firestore };