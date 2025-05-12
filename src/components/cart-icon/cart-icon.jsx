import "./cart-icon.styles.css"
import Cart from "../../assets/cart.svg"

const CartIcon = () => {
    return(
        <div className="cart-icon-container">
            <img src={Cart} alt="image of a shopping cart" className="shopping-icon" />
            <span className="item-count">0</span>
        </div>
    )
}

export default CartIcon