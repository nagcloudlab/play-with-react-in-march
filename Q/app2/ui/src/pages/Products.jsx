import { useState, useEffect } from 'react';

export default function Products({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Fetching products from REST API...</p>
        <p className="meta">
          The browser is calling <code>GET /api/products</code> right now.
          <br />
          In app1 (SSR) this wait happened on the server — the user never saw a spinner.
        </p>
      </div>
    );
  }

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>
      <h1>Products</h1>
      <p className="meta">
        Fetched {products.length} products from the REST API via <code>fetch()</code> in the browser.
      </p>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card product-card">
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            {p.inStock
              ? <span className="badge in-stock">In Stock</span>
              : <span className="badge out-of-stock">Out of Stock</span>
            }
            <button className="btn" onClick={() => onSelectProduct(p.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
