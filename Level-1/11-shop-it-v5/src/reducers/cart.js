

/*

state
--------
[
{
    id: 1,
    name: "Laptop",
    price: 1000,
    quantity: 2,
    totalPrice: 2000
}
]

actions
--------
{
    type: "ADD_TO_CART",
    payload: {
        id: 1,
        name: "Laptop",
        price: 1000
    }
}
    
{
    type: "REMOVE_FROM_CART",
    payload: {
        id: 1
    }
}

{
    type: "CHANGE_QUANTITY",
    payload: {
        id: 1,
        delta: 1
    }
}

{
    type: "CLEAR_CART",
}


*/

function cartReducer(cart = [], action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingProduct = cart.find(item => item.id === action.payload.id)
            if (existingProduct) {
                return cart.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                            totalPrice: (item.quantity + 1) * item.price
                        }
                    }
                    return item
                })
            } else {
                return [...cart, { ...action.payload, quantity: 1, totalPrice: action.payload.price }]
            }
        case "REMOVE_FROM_CART":
            return cart.filter(item => item.id !== action.payload.id)
        case "CHANGE_QUANTITY":
            return cart.map(item => {
                if (item.id === action.payload.id) {
                    const newQuantity = item.quantity + action.payload.delta
                    return {
                        ...item,
                        quantity: newQuantity > 0 ? newQuantity : 1,
                        totalPrice: (newQuantity > 0 ? newQuantity : 1) * item.price
                    }
                }
                return item
            })
        case "CLEAR_CART":
            return []
        default:
            return cart
    }
}

export default cartReducer