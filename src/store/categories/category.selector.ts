import { createSelector } from "reselect"
import { CategoriesState } from "./category.reducer"
import { CategoryMap } from "./category.types"
import { RootState } from "../store"

const selectCategoryReducer = (state: RootState) => state.categories

export const selectCategories = createSelector([selectCategoryReducer], categoriesSlice => categoriesSlice.categories )

export const selectCategoriesMap = createSelector([selectCategories],(categories: CategoryMap) =>
  categories.reduce( (acc, category) => {
    const { title, items } = category
    acc[title.toLowerCase()] = items
    return acc
  }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer], categoriesSlice => categoriesSlice.isLoading)
