import React from 'react';
import { Product } from '../types';
import { Button } from './ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const stockStatus = product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock';
  const stockColor = product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      <img className="w-full h-56 object-cover object-center" src={product.imageUrl} alt={`Image of ${product.name}`} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${stockColor}`}>
                {stockStatus}
            </span>
        </div>
        <p className="text-gray-600 flex-grow">{product.description}</p>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>
          <Button disabled={product.stock === 0}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
