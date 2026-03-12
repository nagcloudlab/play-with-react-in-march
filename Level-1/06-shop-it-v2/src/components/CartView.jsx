

function CartView(props) {
    let { cart, onRemove, onQuantityChange } = props;
    return (
        <div className="card">
            <div className="card-header">
                Cart View
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>&#8377;{item.price}</td>
                                <td>
                                    <div className="d-flex">
                                        <button className="btn btn-secondary btn-sm" onClick={() => onQuantityChange(item, -1)}>-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-secondary btn-sm" onClick={() => onQuantityChange(item, 1)}>+</button>
                                    </div>
                                </td>
                                <td>&#8377;{item.totalPrice}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => onRemove(item)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CartView;