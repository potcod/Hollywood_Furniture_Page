const express = require('express');
const router = express.Router();
const {firestore} = require('../firebaseConfig');

router.post('/', express.json(), async (req, res) => { // Admin add product
    const {name, photoURL, description, price, category } = req.body;
    try{
        console.log("Adding new product:", req.body.name);
        const docRef = await firestore.collection("home").add({
        name: name,
        photo: photoURL,
        description: description,
        price: price,
        category: category
    });
    res.status(201).send({ message: 'Data received successfully!' });
    } catch (error){
        console.error("Error adding product to Firestore:", error);
        res.status(500).json({ error: "Failed to add product" });
    }
        
    

});

router.get('/', express.json(), async (req, res) => {
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




//--------------------------------------EDIT PAGE--------------------------------------




router.put('/:productName', express.json(), async (req, res) => { 
    const productName = req.params.productName; //Retrieving product name from URL
    try{
        await firestore.collection("home").doc(productName).set(req.body);
        res.status(200).send({ message: 'Product updated successfully!' });
    } catch (error) {
        console.error("Error updating product in Firestore:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
})

router.get('/:productName',express.json(), async (req, res) => { 
    const productName = req.params.productName; //Retrieving product name from URL
    const productRef = firestore.collection("home").doc(productName); //Getting document reference 
    const doc = await productRef.get();

    if (!doc.exists) {
        console.log(`Product ${productName} not found`);
        return res.status(404).json({ error: "Product not found" });
    }
    else {
        const productData = doc.data();
        res.status(200).json(productData);
    }

})

router.delete('/:productID', express.json(), async (req, res) => {      
    const productID = req.params.productID; //Retrieving product name from URL
    try{
        await firestore.collection("home").doc(productID).delete();
        console.log("Deleted product with ID:", productID);
        res.status(200).send({ message: 'Product deleted successfully!' });
    } catch (error) {
        console.error("Error deleting product from Firestore:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
});

module.exports = router;