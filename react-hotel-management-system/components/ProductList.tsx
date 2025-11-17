
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import * as firebaseService from '../services/firebaseService';
import ProductCard from './ProductCard';
import { Spinner } from './ui/Spinner';
import { Button } from './ui/Button';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProducts = await firebaseService.getProducts();
      setProducts(fetchedProducts);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Products & Services</h1>
      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your hotel has no products yet</h3>
            <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first product. It will appear here.
            </p>
            <div className="mt-6">
                <Button variant="primary" onClick={() => navigate('/add-product')}>
                    Add Your First Product
                </Button>
            </div>
        </div>
      )}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
};

export default ProductList;
