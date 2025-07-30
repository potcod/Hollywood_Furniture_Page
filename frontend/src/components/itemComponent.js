import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    
    <div key={product.name} className="card rounded-lg shadow-md w-1/20" >
      <img
        src={product.photoURL} // Access the photoURL property
        className="card-img-top rounded-t-lg w-40 h-48 object-cover mb-2" // Tailwind for rounded top corners
        alt={`Product ${product.name}`} // Access the name property for alt text
       
        onError={(e) => {
          // No 'as HTMLImageElement' needed in plain JavaScript
          e.currentTarget.src = 'https://placehold.co/286x180/cccccc/000000?text=Image+Not+Found';

        }}

      />
      <div className="card-body p-4">
        <h5 className="card-title text-xl font-semibold mb-2">
          {product.name} {/* Access the name property */}
        </h5>
        <p className="card-text text-gray-700 mb-3">
          {product.description} {/* Access the description property */}
        </p>
        <div className="text-lg mb-3">
          Price: ${product.price} {/* Access the price property */}
        </div>
      </div>

      <div className="flex-grow mb-3 text-center">
        <Link
          to={`/shop/${product.name}`} 
          className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          state={{ product }} 
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
}