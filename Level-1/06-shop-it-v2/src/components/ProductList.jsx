import Product from "./Product";


function ProductList({ onBuy, cart }) {
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


    return (
        <div className="container">
            <div className="list-group">
                {renderProducts(products)}
            </div>
        </div>
    )


    function renderProducts(products) {
        return products.map(product => (
            <div key={product.id}>
                {renderProduct(product)}
            </div>
        ))
    }

    function renderProduct(product) {
        return <Product key={product.id} product={product} onBuy={onBuy} cart={cart} />
    }

}

export default ProductList;