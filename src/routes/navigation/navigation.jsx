import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import CartIcon from "../../components/cart-icon/cart-icon"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown"
import  Logo  from "../../assets/crown.svg"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import "./navigation.styles.scss"

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    
    return(
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <img src={Logo} alt="image of logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                    { currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) : (<Link to="/auth" className="nav-link">SIGN IN</Link>) }
                    <CartIcon />
                </div>
                { isCartOpen && <CartDropdown /> }
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation