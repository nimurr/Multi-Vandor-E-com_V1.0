import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_BASE = '/api';

function Storefront() {
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get('storeId');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (storeId) {
      fetchProducts(storeId);
    }
  }, [storeId]);

  const fetchProducts = async (id) => {
    try {
      // Assume public endpoint or guest access; backend needs /api/store/:id/products GET (add later)
      // Placeholder
      setProducts([
        { _id: 1, name: 'Sample Product 1', price: 29.99, image: 'https://via.placeholder.com/200' },
        { _id: 2, name: 'Sample Product 2', price: 49.99, image: 'https://via.placeholder.com/200' }
      ]);
    } catch (err) {
      console.error('Error fetching products');
    }
  };

  return (
    <div className="store">
      <header>
        <h1>Your Store {storeId ? `(ID: ${storeId})` : ''}</h1>
      </header>
      <main>
        <div className="products">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  return <Storefront />;
}

export default App;
