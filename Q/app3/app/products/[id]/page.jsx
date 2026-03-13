import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getAllProductIds } from '../../../lib/products';

// Generate static params so Next.js can pre-render these at build time
export function generateStaticParams() {
  return getAllProductIds();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Not Found' };
  return { title: `${product.name} — Next.js SSR Demo` };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <>
      <h1>{product.name}</h1>

      <div className="timestamp">
        Server-rendered at <strong>{new Date().toLocaleTimeString()}</strong>
      </div>

      <div className="card">
        <p className="price">${product.price}</p>
        {product.inStock
          ? <span className="badge in-stock">In Stock</span>
          : <span className="badge out-of-stock">Out of Stock</span>
        }
        <hr />
        <p>{product.description}</p>
        <hr />
        <h3>What happened here:</h3>
        <ol>
          <li>You clicked a <code>&lt;Link&gt;</code> — Next.js navigated client-side (no reload)</li>
          <li>Next.js fetched this page&apos;s server-rendered HTML in the background</li>
          <li>The server component called <code>getProduct({product.id})</code> — a direct function call, not an API request</li>
          <li>The HTML arrived with the data already embedded — no spinner needed</li>
        </ol>
      </div>

      <Link href="/products" className="btn">Back to Products</Link>
    </>
  );
}
