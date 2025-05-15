import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles"
import Cart from "../../assets/cart.svg"


const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
           <img src={Cart} alt="image of a cart" width="24px" height="24px" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon