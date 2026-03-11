import {
  useReducer,
  useState
} from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartBadge from './components/CartBadge'
import CartView from './components/CartView'

import cartReducer from './reducers/cart'
import CartContext from './contexts/CartContext'


function App() {

  const [isCartOpen, setCartOpen] = useState(false)
  const [cart, dispatch] = useReducer(cartReducer, [])


  return (
    <div className="container">
      <Navbar title="shop-IT" />
      <hr />
      <CartContext.Provider value={{ cart, dispatch }}>
        <CartBadge />
        <hr />
        <button className="btn btn-primary" onClick={() => setCartOpen(!isCartOpen)}>
          {isCartOpen ? 'Close Cart' : 'Open Cart'}
        </button>
        <hr />
        {isCartOpen && <CartView />}
        <hr />
        <ProductList />
      </CartContext.Provider>
    </div>
  )

}


export default App
