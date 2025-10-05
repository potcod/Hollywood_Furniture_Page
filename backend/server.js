const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 5000; // Port number for the server

const {firestore} = require('./firebaseConfig');

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const shopRouter = require('./routes/shopRoute');
app.use('/shop', shopRouter);

const adminRouter = require('./routes/adminRoute');
app.use('/admin', adminRouter);


app.get('/', async (req, res) => { // Home page 
    const slideshow = [];
    const featuredProducts = [];
    var featureCount = 0; // Counter for featured products
    const querySnapshot = await firestore.collection("home").get();
    querySnapshot.forEach((doc) => {

        //Return userID(same as doc name), dislayName, photoURL, and created recipes,
        slideshow.push({ name: doc.get("name"), price: doc.get("price"), photoURL: doc.get("photo"), description: doc.get("description") });

        if (featureCount < 3) { // Check if the product is featured and limit to 3
            featuredProducts.push({ name: doc.get("name"), price: doc.get("price"), photoURL: doc.get("photo"), description: doc.get("description") });
            featureCount++;
        }


    });

    console.log("Fetched ( " + slideshow.length + " ) items from Firestore");
    res.status(200).json({ slideshow: slideshow, featuredProducts: featuredProducts });

});



