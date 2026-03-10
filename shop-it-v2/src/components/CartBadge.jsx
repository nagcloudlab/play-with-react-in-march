

function CartBadge({ count }) {
    return (
        <div>
            <span className="badge bg-secondary">
                Cart: {count} item(s) in cart
            </span>
        </div>
    )
}

export default CartBadge