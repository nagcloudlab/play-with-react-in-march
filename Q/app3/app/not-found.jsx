import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h1>404 — Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn">Go Home</Link>
    </>
  );
}
