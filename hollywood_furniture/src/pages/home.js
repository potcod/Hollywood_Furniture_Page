export function Home() {
    const images = [
        'https://picsum.photos/id/1011/800/400',
        'https://picsum.photos/id/1015/800/400',
        'https://picsum.photos/id/1025/800/400',
        'https://picsum.photos/id/1035/800/400',
        'https://picsum.photos/id/1045/800/400',
        'https://picsum.photos/id/1055/800/400',
      ];
    
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
                <img src={src} className="d-block w-100" alt={`Slide ${idx + 1}`} />
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
          {[1, 2, 3].map((num) => (
            <div key={num} className="card" style={{ width: '18rem' }}>
              <img
                src={`https://picsum.photos/286/180?random=${num}`}
                className="card-img-top"
                alt={`Product ${num}`}
              />
              <div className="card-body">
                <h5 className="card-title">Furniture Piece {num}</h5>
                <p className="card-text">
                  Stylish, functional, and crafted with care. A must-have for modern homes.
                  Cost: $$$
                </p>
                <a href="#" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
          ))}
        </section>

      </main>
    </div>
    );
}

export default Home;