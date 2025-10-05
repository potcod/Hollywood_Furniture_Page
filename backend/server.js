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

app.get('/shop', async (req, res) => { // Shop page
    const products = [];

    const querySnapshot = await firestore.collection("home").get();
    querySnapshot.forEach((doc) => {
        products.push({ name: doc.get("name"), price: doc.get("price"), photoURL: doc.get("photo"), description: doc.get("description") });
    });

    console.log("Fetched ( " + products.length + " ) items from Firestore");
    res.status(200).json({ products: products });
});

app.get('/shop/:productName', async (req, res) => { // Specific product details

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

app.post('/admin/', express.json(), async (req, res) => { // Admin add product
    const {name, photo, description, price, category } = req.body;
    try{
        const docRef = firestore.collection("home").add({
        
        name: name,
        photo: photo,
        description: description,
        price: price,
        category: category
    });
    await docRef.update({ id: docRef.id });
    console.log(`Added product: ${name}`);
    } catch {
        console.error("Error adding product to Firestore:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
        
    res.status(200).send({ message: 'Data received successfully!', data: { name, value } });

});

app.get('/admin', express.json(), async (req, res) => {
  try {
    const snapshot = await firestore.collection("home").get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,  // doc.id is the Firestore document ID
      ...doc.data()
    }));

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.put('/admin/:productName', express.json(), async (req, res) => { 
    const productName = req.params.productName; //Retrieving product name from URL
    console.log("Received update request for product:", productName);
    console.log("Request body:", req.body);
    try{
        await firestore.collection("home").doc(productName).set(req.body);
        res.status(200).send({ message: 'Product updated successfully!' });


    } catch (error) {
        console.error("Error updating product in Firestore:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
})
app.get('/admin/:productName',express.json(), async (req, res) => { 
    const productName = req.params.productName; //Retrieving product name from URL
    const productRef = firestore.collection("home").doc(productName); //Getting document reference 
    const doc = await productRef.get();

    if (!doc.exists) {
        console.log(`Product ${productName} not found`);
        return res.status(404).json({ error: "Product not found" });
    }
    else {
        const productData = doc.data();
        console.log("Product data:", productData);
        const product = {
            name: productData.name,
            price: productData.price,
            photoURL: productData.photoURL,
            description: productData.description
        };
        
        res.status(200).json(productData);
    }

})