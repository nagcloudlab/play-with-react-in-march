import {
  useState
} from 'react'


function App() {
  console.log("Rendering App Component")

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
      isAvailable: false
    },
  ]
  const [currentTab, setCurrentTab] = useState(1)

  return (
    <div className="container">
      <div className="display-1">shop-IT</div>
      <hr />
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


    const handleTabChange = (tab) => {
      console.log("Selected Tab: ", tab)
      setCurrentTab(tab)
    }

    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-4">
            <img src={product.imageUrl} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-8">
            <div>{product.name}</div>
            <div>{product.price}</div>
            <button className="btn btn-primary" disabled={!product.isAvailable}>
              {product.isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
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
    )
  }

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


export default App
