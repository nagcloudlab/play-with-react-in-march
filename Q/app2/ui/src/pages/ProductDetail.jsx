import { useState, useEffect } from 'react';

export default function ProductDetail({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Fetching product #{productId} from API...</p>
      </div>
    );
  }

  return (
    <>
      <h1>{product.name}</h1>

      <div className="card">
        <p className="price">${product.price}</p>
        {product.inStock
          ? <span className="badge in-stock">In Stock</span>
          : <span className="badge out-of-stock">Out of Stock</span>
        }
        <hr />
        <p>{product.description}</p>
        <p className="meta">
          This data was fetched client-side via <code>GET /api/products/{product.id}</code>.
          In app1 (SSR), the HTML already contained this content.
        </p>
      </div>

      <button className="btn" onClick={onBack}>Back to Products</button>
    </>
  );
}
