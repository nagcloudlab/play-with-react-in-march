import {
  useReducer,
} from 'react'
import Navbar from './components/Navbar'
import CartBadge from './components/CartBadge'
import CartView from './components/CartView'
import ProductList from './components/ProductList'

import cartReducer from './reducers/cart'
import CartContext from './contexts/CartContext'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import Home from './components/Home'


function App() {

  const [cart, dispatch] = useReducer(cartReducer, [])


  return (
    <div className="container">
      <Navbar title="shop-IT" />
      <hr />
      <CartContext.Provider value={{ cart, dispatch }}>
        <Router>
          <CartBadge />
          <hr />
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
          </ul>
          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<CartView />} />
          </Routes>
          <hr />
        </Router>
      </CartContext.Provider>
    </div>
  )

}


export default App
