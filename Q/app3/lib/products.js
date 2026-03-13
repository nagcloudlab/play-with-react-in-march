// Shared product data — same as app1 and app2 for comparison
const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 89.99, inStock: true,  description: 'Cherry MX Brown switches, RGB backlight' },
  { id: 2, name: 'Wireless Mouse', price: 34.99, inStock: true,  description: 'Ergonomic, 2.4GHz wireless, 6 buttons' },
  { id: 3, name: 'USB-C Hub', price: 49.99, inStock: false, description: '7-in-1: HDMI, USB-A x3, SD, ethernet' },
  { id: 4, name: '27" Monitor', price: 299.99, inStock: true,  description: '4K IPS, 60Hz, USB-C power delivery' },
  { id: 5, name: 'Webcam HD', price: 59.99, inStock: true,  description: '1080p, auto-focus, built-in mic' },
];

// Simulate DB delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getProducts() {
  await delay(200); // simulate DB query
  return products;
}

export async function getProduct(id) {
  await delay(100);
  return products.find((p) => p.id === Number(id)) || null;
}

export function getAllProductIds() {
  return products.map((p) => ({ id: String(p.id) }));
}
