import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../../utils/test/test.utils"
import CartIcon from "../cart-icon"

describe('Cart Icon tests', () => {
    test('Use preloaded state to render', () => {
        const initialCartItems = [
            { 
                id: 1, 
                name: 'Item A', 
                imageUrl: 'test', 
                price: 10, 
                quantity: 1 
            }
        ]

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: initialCartItems
                }
            }
        })

        const cartIconElement = screen.getByText('1')
        expect(cartIconElement).toBeInTheDocument()
    })
})