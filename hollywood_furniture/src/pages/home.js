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
      {/* Header 1 */}
      <header className="main-header text-center py-3">
        <h1>Hollywood Furniture</h1>
      </header>

      {/* Header 2 */}
      <header className="sub-header">
        <h2 className="visually-hidden">Navigation</h2>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                <a className="nav-link" href="#/shop">Shop</a>
                <a className="nav-link" href="#/about">About</a>
                <a className="nav-link" href="#/contact">Contact</a>
              </div>

              <div className="ms-auto d-flex align-items-center gap-3">
                <a
                  href="https://www.yelp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                  aria-label="Yelp"
                >
                  <i className="fab fa-yelp"></i>
                </a>
                <button className="btn btn-outline-secondary position-relative" aria-label="Shopping Cart">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                    <span className="visually-hidden">items in cart</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

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