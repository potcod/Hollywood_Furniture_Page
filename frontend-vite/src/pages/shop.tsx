import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type{ Product } from "../models/Product.js";
//import ProductCard from "../components/ProductCard.js";
import ProductCard from "../components/itemComponent.tsx";
export function Shop() {

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    
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
    <div className="app-container mx-[20%]">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-y-5 ">

        {products.map((product) => (
          <ProductCard key={product.name} product={product}  />
        ))}
        
      </section>
    </div>
  );
}

export default Shop;