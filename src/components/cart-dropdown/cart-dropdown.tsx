import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../button/button"
import CartItem from "../cart-item/cart-item"
import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles"
import { useSelector } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()
    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
    },[])
    
    return(
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ? (cartItems.map( item => (
                    <CartItem key={item.id} cartItem={item} />
                ))) : (<EmptyMessage>Your cart is empty </EmptyMessage>)}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown
