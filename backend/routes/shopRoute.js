const express = require('express');
const router = express.Router();
const {firestore} = require('../firebaseConfig');


router.get('/', async (req, res) => { // Shop page
    const products = [];

    const querySnapshot = await firestore.collection("home").get();
    querySnapshot.forEach((doc) => {
        products.push({ name: doc.get("name"), price: doc.get("price"), photoURL: doc.get("photo"), description: doc.get("description") });
    });

    console.log("Fetched ( " + products.length + " ) items from Firestore");
    res.status(200).json({ products: products });
});

router.get('/:productName', async (req, res) => { // Specific product details

    const productName = req.params.productName; //Retrieving product name from URL
    const productRef = firestore.collection("home").doc(productName); //Getting document reference 
    const doc = await productRef.get();

    if (!doc.exists) {
        console.log(`Product ${productName} not found`);
        return res.status(404).json({ error: "Product not found" });
    }
    else {
        const productData = doc.data();
        const product = {
            name: productData.name,
            price: productData.price,
            photoURL: productData.photo,
            description: productData.description
        };
        console.log(`Fetched details for product: ${productName}`);
        res.status(200).json(product);
    }

    console.log(`Fetched details for product: ${productName}`);
    res.status(200).json(product);
});

module.exports = router;