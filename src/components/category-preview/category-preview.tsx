import ProductCard from "../product-card/product-card"
import { FC } from "react"
import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles"
import { CategoryItem } from "../../store/categories/category.types"

type CategoryPreviewProps = {
    title: string
    products: CategoryItem[]
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return(
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                { products.filter( (_, index) => index < 4).map( product => ( <ProductCard key={product.id} product={product} /> ))}
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview