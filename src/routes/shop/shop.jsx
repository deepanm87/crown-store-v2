import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import CategoriesPreview from "../categories-preview/categories-preview"
import Category from "../category/category"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { setCategoriesMap } from "../../store/categories/category.action.js"
import "./shop.styles.scss"

const shop = () => {
    const dispatch = useDispatch()

    useEffect( () => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories')
            dispatch(setCategoriesMap(categoryMap))
        }

        getCategoriesMap()
    }, [])
 
    return(
            <Routes>
                <Route index element={<CategoriesPreview />} />
                <Route path=":category" element={<Category />} />
            </Routes>
        
        
    )
}

export default shop