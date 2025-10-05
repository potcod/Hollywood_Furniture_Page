const express = require('express');
const router = express.Router();
const {firestore} = require('../firebaseConfig');

router.post('/admin/', express.json(), async (req, res) => { // Admin add product
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

router.get('/admin', express.json(), async (req, res) => {
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

router.put('/admin/:productName', express.json(), async (req, res) => { 
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
router.get('/admin/:productName',express.json(), async (req, res) => { 
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

module.exports = router;