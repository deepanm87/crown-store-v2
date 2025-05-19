import { useDispatch, useSelector } from "react-redux"
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector"
import { setIsCartOpen } from "../../store/cart/cart.action"
import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles"
import Cart from "../../assets/cart.svg"


const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
           <img src={Cart} alt="image of a cart" width="24px" height="24px" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon