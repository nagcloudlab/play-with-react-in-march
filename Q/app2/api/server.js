const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- Fake data (same products as app1 for comparison) ---
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 89.99, inStock: true,  description: 'Cherry MX Brown switches, RGB backlight' },
  { id: 2, name: 'Wireless Mouse', price: 34.99, inStock: true,  description: 'Ergonomic, 2.4GHz wireless, 6 buttons' },
  { id: 3, name: 'USB-C Hub', price: 49.99, inStock: false, description: '7-in-1: HDMI, USB-A x3, SD, ethernet' },
  { id: 4, name: '27" Monitor', price: 299.99, inStock: true,  description: '4K IPS, 60Hz, USB-C power delivery' },
  { id: 5, name: 'Webcam HD', price: 59.99, inStock: true,  description: '1080p, auto-focus, built-in mic' },
];

// --- REST endpoints ---

// GET /api/products — list all
app.get('/api/products', (req, res) => {
  // Simulate slight network delay so the UI loading state is visible
  setTimeout(() => {
    res.json(products);
  }, 500);
});

// GET /api/products/:id — single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  setTimeout(() => {
    res.json(product);
  }, 300);
});

app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}`);
});
