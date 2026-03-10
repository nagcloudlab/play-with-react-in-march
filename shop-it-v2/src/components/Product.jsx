
import { useState } from "react"


function Product(props) {

    const { product, cart, onBuy } = props;
    const [currentTab, setCurrentTab] = useState(1)

    const handleTabChange = (tab) => {
        console.log("Selected Tab: ", tab)
        setCurrentTab(tab)
    }

    const isInCart = cart.find(item => item.id === product.id)


    return (
        <>
            <div className="list-group-item">
                <div className="row">
                    <div className="col-4">
                        <img src={product.imageUrl} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <div>{product.name}</div>
                        <div>&#8377;{product.price}</div>
                        <button onClick={() => onBuy(product)} className="btn btn-primary" disabled={!product.isAvailable}>
                            {product.isAvailable ? "Add to Cart" : "Out of Stock"}
                        </button>
                        <small className="text-muted"> {isInCart ? "Already in Cart" : ""}</small>,
                        <small> Quantity: {isInCart ? isInCart.quantity : 0}</small>
                        <hr />
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={`nav-link ${currentTab === 1 ? "active" : ""}`} href="#" onClick={() => handleTabChange(1)}>Description</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${currentTab === 2 ? "active" : ""}`} href="#" onClick={() => handleTabChange(2)}>Specifications</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${currentTab === 3 ? "active" : ""}`} href="#" onClick={() => handleTabChange(3)}>Reviews</a>
                            </li>
                        </ul>
                        {renderTabPanel(product)}
                    </div>
                </div>
            </div>
        </>
    )

    function renderTabPanel(product) {
        switch (currentTab) {
            case 1:
                return <div>{product.description}</div>
            case 2:
                return <div>Specifications will be here...</div>
            case 3:
                return <div>Reviews will be here...</div>
            default:
                return null
        }
    }
}

export default Product;