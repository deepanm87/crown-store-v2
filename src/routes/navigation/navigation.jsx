import { Fragment, useContext } from "react"
import { useSelector } from "react-redux"
import { Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import  Logo  from "../../assets/crown.svg"
import { selectCurrentUser } from "../../store/user/user.selector"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"

const Navigation = () => {
    const currentUser = useSelector( selectCurrentUser)
    const { isCartOpen } = useContext(CartContext)
    
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