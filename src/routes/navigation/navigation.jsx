import "./navigation.styles.scss"
import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react"
import  Logo  from "../../assets/crown.svg"

const Navigation = () => {
    return(
        <Fragment>
            <nav className="navigation">
                <Link to="/" className="logo-container">
                    <img src={Logo} alt="image of logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="/shop" className="nav-link">SHOP</Link>
                </div>
            </nav>
            <Outlet />
        </Fragment>
    )
}

export default Navigation