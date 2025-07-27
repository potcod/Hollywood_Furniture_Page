import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../models/Product.js";
import ProductCard from "../components/ProductCard.js";
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
          <div key={product.name} className="card rounded-lg shadow-md" style={{ width: '18rem' }}>
            <img
              src={product.photoURL} // Access the photoURL property
              className="card-img-top rounded-t-lg" // Tailwind for rounded top corners
              alt={`Product ${product.name}`} // Access the name property for alt text
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/286x180/cccccc/000000?text=Image+Not+Found';
              }}
            />
            <div className="card-body p-4">
              <h5 className="card-title text-xl font-bold mb-2">
                {product.name} {/* Access the name property */}
              </h5>
              <p className="card-text text-gray-700 mb-3">
                {product.description} {/* Access the description property */}
              </p>
              <div className="text-lg font-semibold mb-3">
                Price: ${product.price} {/* Access the price property */}
              </div>

              <Link to={`/shop/${product.name}`} className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Shop;