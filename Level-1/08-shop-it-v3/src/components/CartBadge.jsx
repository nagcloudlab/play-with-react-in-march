
import React, { useContext, useMemo } from "react"
import CartContext from "../contexts/CartContext"

function CartBadge({ }) {
    const { cart } = useContext(CartContext)
    const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
    return (
        <div>
            <span className="badge bg-secondary">
                Cart: {count} item(s) in cart
            </span>
        </div>
    )
}

export default CartBadge