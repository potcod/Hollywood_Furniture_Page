import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css_styles/home.css';
import { Product } from "../models/Product.js"; // Assuming you have a Product model defined
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
        <section className="featured-products d-flex justify-content-around flex-wrap gap-4">
        {featuredProducts.map((product) => ( // Renamed featuredProduct to product for brevity
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

      </main>
    </div>
    );
}

export default Home;