
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*'
}));


const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1000,
        description: "A high-performance laptop for all your computing needs.",
        imageUrl: "Laptop.png",
        isAvailable: true
    },
    {
        id: 2,
        name: "Smartphone",
        price: 500,
        description: "A sleek smartphone with the latest features.",
        imageUrl: "Mobile.png",
        isAvailable: true
    },
]


app.get('/api/products', (req, res) => {
    res.json(products);
});


app.listen(4000, () => {
    console.log('Products service is running on port 4000');
});