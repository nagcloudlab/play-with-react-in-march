

function CartView(props) {
    let { cart, onRemove } = props;
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
                                <td>{item.quantity}</td>
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