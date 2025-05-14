import { Routes, Route } from "react-router-dom"
import CategoriesPreview from "../categories-preview/categories-preview"
import Category from "../category/category"
import "./shop.styles.css"

const shop = () => {
 
    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default shop