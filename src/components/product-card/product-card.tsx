import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector"
import { CategoryItem } from "../../store/categories/category.types"
import Button, { BUTTON_TYPE_CLASSES } from "../button/button"
import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles"

type ProductCardProps = {
    product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {

    const { name, price, imageUrl } = product
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>${price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
        
    )
}

export default ProductCard