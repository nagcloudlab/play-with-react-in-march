import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import './styles.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  function navigate(pageName, productId) {
    setPage(pageName);
    if (productId) setSelectedProductId(productId);
  }

  return (
    <>
      <Navbar navigate={navigate} />
      <main className="container">
        {page === 'home' && <Home />}
        {page === 'products' && (
          <Products onSelectProduct={(id) => navigate('product-detail', id)} />
        )}
        {page === 'product-detail' && (
          <ProductDetail
            productId={selectedProductId}
            onBack={() => navigate('products')}
          />
        )}
      </main>
      <footer className="container">
        <p>This HTML was generated entirely in the <strong>browser</strong> via JavaScript. View Page Source to confirm!</p>
      </footer>
    </>
  );
}
