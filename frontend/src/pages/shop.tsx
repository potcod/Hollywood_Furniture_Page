import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../models/Product.js";
import { ProductCard } from "../components/itemComponent.js";
export function Shop() {

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    // Fetch images from backend
    fetch("http://localhost:5000/shop")
      .then((res) => res.json())
      .then((data) => {
        // data is an array of objects from your backend
        setProducts(data.products);
        console.log("Shop has fetched products:", data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);
  return (
    <div className="app-container">
      <section className="products d-flex justify-content-around flex-wrap gap-4">

        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Shop;