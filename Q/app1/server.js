const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

// --- Handlebars setup ---
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// --- Static files ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Fake data (pretend this comes from a database) ---
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 89.99, inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 34.99, inStock: true },
  { id: 3, name: 'USB-C Hub', price: 49.99, inStock: false },
  { id: 4, name: '27" Monitor', price: 299.99, inStock: true },
  { id: 5, name: 'Webcam HD', price: 59.99, inStock: true },
];

// --- Routes ---

// Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'SSR Demo — Home',
    heading: 'Server-Side Rendering with Express + Handlebars',
    features: [
      'HTML is generated on the server, not in the browser',
      'The browser receives fully-rendered HTML',
      'Great for SEO — crawlers see real content',
      'Fast first paint — no JS bundle to download first',
    ],
  });
});

// Products page — dynamic data rendered on the server
app.get('/products', (req, res) => {
  res.render('products', {
    title: 'SSR Demo — Products',
    products,
    renderedAt: new Date().toLocaleTimeString(),
  });
});

// Single product page — route params
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).render('404', { title: 'Not Found' });
  }
  res.render('product', {
    title: `SSR Demo — ${product.name}`,
    product,
    renderedAt: new Date().toLocaleTimeString(),
  });
});

// View source — show that HTML arrives fully rendered
app.get('/view-source', (req, res) => {
  res.render('view-source', { title: 'SSR Demo — View Source' });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`SSR demo running at http://localhost:${PORT}`);
});
