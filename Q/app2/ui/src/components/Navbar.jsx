export default function Navbar({ navigate }) {
  return (
    <nav>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('products'); }}>Products</a>
    </nav>
  );
}
