
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Product() {
  const location = useLocation();
  const product = location.state?.product;
  return (
    <div className="app-container">
      <div className='flex flex-row ps-6'>
        <img src={product.photoURL} alt={product.name} className="w-1/4 h-1/4  rounded-lg shadow-md " />
        
        <div className="flex flex-col p-4">
          <h1>
            {product.name} {/* Access the name property */}
          </h1>
          <p>
            {product.description} {/* Access the description property */}
          </p>
          <div className="text-lg mb-3">
            Price: ${product.price} {/* Access the price property */}
          </div>

          <div className="">
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Add to Cart
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}