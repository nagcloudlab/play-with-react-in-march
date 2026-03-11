import {
  useState
} from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartBadge from './components/CartBadge'
import CartView from './components/CartView'


function App() {


  /*
  cart = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
    quantity: 2,
    totalPrice: 2000
}
  */

  const [cart, setCart] = useState([])
  const [isCartOpen, setCartOpen] = useState(false)

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id)
    if (existingProduct) {
      const newCart = cart.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * item.price
          }
        }
        return item
      })
      setCart(newCart)
    } else {
      setCart([...cart, { ...product, quantity: 1, totalPrice: product.price }])
    }
  }

  const removeFromCart = (product) => {
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
  }

  const changeQuantity = (product, delta) => {
    const newCart = cart.map(item => {
      if (item.id === product.id) {
        const newQuantity = item.quantity + delta
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1,
          totalPrice: (newQuantity > 0 ? newQuantity : 1) * item.price
        }
      }
      return item
    })
    setCart(newCart)
  }

  return (
    <div className="container">
      <Navbar title="shop-IT" />
      <hr />
      <CartBadge count={cart.length} />
      <hr />
      <button className="btn btn-primary" onClick={() => setCartOpen(!isCartOpen)}>
        {isCartOpen ? 'Close Cart' : 'Open Cart'}
      </button>
      <hr />
      {isCartOpen && <CartView cart={cart} onRemove={removeFromCart} onQuantityChange={changeQuantity} />}
      <hr />
      <ProductList onBuy={(product) => addToCart(product)} cart={cart} />
    </div>
  )

}


export default App
