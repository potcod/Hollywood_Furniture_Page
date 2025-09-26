
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

export function Product() {
  const location = useLocation();
  const product = location.state?.product;
  return (
    <div className="mx-[20%]">
      <div className='flex flex-row'>
        <img src={product.photoURL} alt={product.name} className="w-2/5 h-2/5 rounded-lg shadow-md " />

        <div className="flex flex-col p-4">
          <p className ="text-4xl !font-semibold mb-4">
            {product.name} 
          </p>

          <div className="text-lg mb-3">
            Price: ${product.price} 
          </div>

          <div className="">
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Add to Cart
            </button>
          </div>

        </div>

      </div>
      <div className="mt-4 ps-6">
        <p className="text-gray-700">{product.description}</p>
      </div>
     
      
    </div>
  );
}