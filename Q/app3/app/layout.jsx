import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Next.js SSR Demo',
  description: 'Server-Side Rendering with Next.js — compare with app1 (Express SSR) and app2 (React CSR)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </nav>
        <main className="container">{children}</main>
        <footer className="container">
          <p>
            This HTML was rendered on the <strong>server</strong> by Next.js —
            then <strong>hydrated</strong> on the client for interactivity.
          </p>
        </footer>
      </body>
    </html>
  );
}
