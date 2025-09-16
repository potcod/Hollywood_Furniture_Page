import { useEffect, useState } from "react";
import type { Product } from "../models/Product.js";
import ProductCard from "../components/itemComponent.tsx";
import "../css_styles/home.css";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.slideshow.map((item: Product) => item.photoURL));
        setFeaturedProducts(data.featuredProducts);
      })
      .catch((err) => console.error("Failed to fetch images", err));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center pt-[80px]">
      {/* Slideshow */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        style={{ width: "80%", maxWidth: "800px", margin: "0 auto" }} // ensures centering
      >
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
            />
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((src, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <img src={src} className="w-full " alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Featured Products */}
      <section className="flex flex-wrap justify-center gap-4 bg-red-950">
        {featuredProducts.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </section>
    </main>
  );
}
