import { screen } from "@testing-library/react"
import Navigation from "../navigation"
import { renderWithProviders } from "../../../utils/test/test.utils"

describe('Navigation tests',() => {
    test('It should render a sign in link and not a sign out link if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadState: {
                user: {
                    currentUser: null,
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i)
        expect(signInLinkElement).toBeInTheDocument()

        const signOutLinkElement = screen.queryByText(/sign out/i)
        expect(signOutLinkElement).toBeNull()
    })

    test('it should not render sign out and not sign in  if there is a current user', () => {
        renderWithProviders(<Navigation />, {
            preloadState: {
                user: {
                    currentUser: {}
                }
            }
        })

        const signInLinkElement = screen.queryByText(/sign in/i)
        expect(signInLinkElement).toBeNull()

        const signOutLinkElement = screen.getByText(/sign out/i)
        expect(signOutLinkElement).toBeInTheDocument()        
    })

    test('it should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })

        const dropdownTextElement = screen.queryByText(/your cart is empty/i)
        expect(dropdownTextElement).toBeNull()
    })

    test('it should render a cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        })

        const dropdownTextElement = screen.getByText(/your cart is empty/i)
        expect(dropdownTextElement).toBeInTheDocument()
    })
})