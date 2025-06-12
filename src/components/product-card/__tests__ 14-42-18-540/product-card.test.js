import { screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../../utils/test/test.utils"
import ProductCard from "../product-card"

describe('Product Card tests', () => {
    test('it should add the product item when Product Cart button is clicked', async () => {
        const mockProduct = {
            id: 1,
            imageUrl: 'test',
            name: 'Item A',
            price: 10
        }
        const { store } =  renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })

        const addToCartButtonElement = screen.getByText(/add to cart/i)
        await fireEvent.click(addToCartButtonElement)

        expect(store.getState().cart.cartItems.length).toBe(1)
    })
})