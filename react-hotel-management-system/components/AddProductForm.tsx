import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as firebaseService from '../services/firebaseService';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !price || !stock || !description || !imageUrl) {
        setError('Please fill out all fields.');
        setLoading(false);
        return;
    }

    try {
      const newProductData = {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl,
        description,
      };
      await firebaseService.addProduct(newProductData);
      navigate('/products');
    } catch (err: any) {
      setError(err.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add a New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Product Name"
            id="productName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price ($)"
              id="price"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0.01"
              step="0.01"
            />
            <Input
              label="Stock Quantity"
              id="stock"
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
            />
          </div>
          
          <Input
            label="Image URL"
            id="imageUrl"
            type="text"
            required
            placeholder="e.g., https://picsum.photos/seed/product.../600/400"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          
          <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                  id="description"
                  rows={4}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          
          <div className="pt-2">
            <Button type="submit" className="w-full" isLoading={loading}>
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
