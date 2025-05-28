import { Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import  Logo  from "../../assets/crown.svg"
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { signOutStart } from "../../store/user/user.action"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector( selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    const signOutUser = () => dispatch(signOutStart())
    
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <img src={Logo} alt="image of logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    { currentUser ? (<NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>) : (<NavLink to="/auth">SIGN IN</NavLink>) }
                    <CartIcon />
                    { isCartOpen && <CartDropdown /> }
                </NavLinks>
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation