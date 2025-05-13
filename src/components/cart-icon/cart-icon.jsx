import "./cart-icon.styles.css"
import Cart from "../../assets/cart.svg"
import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"


const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return(
        <div className="cart-icon-container" onClick={toggleIsCartOpen} >
            <img src={Cart} alt="image of a shopping cart" className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon