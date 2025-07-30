import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css_styles/home.css';
import { Product } from "../models/Product.js"; // Assuming you have a Product model defined
import ProductCard from "../components/itemComponent";
export function Home() {
    const [images, setImages] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    

    useEffect(() => {
    // Fetch images from backend
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        // data is an array of objects from your backend
        const imageUrls = data.slideshow.map((item:Product) => item.photoURL); 
        setImages(imageUrls);
        setFeaturedProducts(data.featuredProducts);
        console.log("Home has fetched images:", imageUrls);
      })
      .catch((err) => {
        console.error("Failed to fetch images", err);
      });
  }, []);

    return (
      <div className="app-container">
      
      {/* Main */}
      <main className="main-content container my-5">

        {/* Slideshow */}
        <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : ""}
                aria-current={idx === 0 ? "true" : undefined}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {images.map((src, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                <img src={src} className="d-block w-100 carousel-image" alt={`Slide ${idx + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Featured Products */}
        <section className="featured-products d-flex justify-content-around flex-wrap ">
        {featuredProducts.map((product) => ( // Renamed featuredProduct to product for brevity
          
          <ProductCard key={product.name} product={product} />
        ))}
      </section>

      </main>
    </div>
    );
}

export default Home;