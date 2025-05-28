export function Shop() {
    return (
        <div>
            <header className="main-header text-center py-3">
                <h1>Hollywood Furniture</h1>
            </header>

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
        </div>
    );
}

export default Shop;