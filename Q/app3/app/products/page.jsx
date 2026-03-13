import Link from 'next/link';
import { getProducts } from '../../lib/products';

// This is a Server Component — it runs on the server only.
// No useEffect, no useState, no loading spinner needed.
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <h1>Products</h1>

      <div className="timestamp">
        Server-rendered at <strong>{new Date().toLocaleTimeString()}</strong>.
        This data was fetched on the server via <code>async/await</code> — no API call from the browser.
      </div>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card product-card">
            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            {p.inStock
              ? <span className="badge in-stock">In Stock</span>
              : <span className="badge out-of-stock">Out of Stock</span>
            }
            <Link href={`/products/${p.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
