import { useEffect, useState } from "react";
import Product from "./Product";

import { getProducts } from "../api/todos"

function ProductList({ }) {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
            .then(products => setProducts(products))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

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
        return <Product key={product.id} product={product} />
    }

}

export default ProductList;