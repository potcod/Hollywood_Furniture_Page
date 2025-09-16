import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../models/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="!bg-white !rounded-lg !shadow-md w-64 flex flex-col overflow-hidden">
      {/* Product image */}
      <img
        src={product.photoURL}
        className="!w- !h-48 !object-cover"
        alt={`Product ${product.name}`}
        onError={(e) => {
          e.currentTarget.src =
            'https://placehold.co/286x180/cccccc/000000?text=Image+Not+Found';
        }}
      />

      {/* Product content */}
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="!text-xl !font-semibold mb-2">{product.name}</h5>
        <p className="!text-gray-700 mb-3 flex-grow">{product.description}</p>
        <div className="!text-lg !font-bold mb-3">
          Price: ${product.price}
        </div>

        {/* Shop button */}
        <Link
          to={`/shop/${product.name}`}
          className="!bg-blue-500 hover:!bg-blue-600 !text-white !font-bold py-2 px-4 !rounded-lg transition duration-300 text-center"
          state={{ product }}
        >
          Shop Now
        </Link>
        <div className="bg-red-500 text-white text-5xl p-10">
          TAILWIND WORKS
        </div>
      </div>
    </div>
  );
}
