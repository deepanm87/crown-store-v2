import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { CategoriesProvider } from "./contexts/categories.context"
import { CartProvider } from "./contexts/cart.context"
import { store } from "./store/store"

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <CategoriesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CategoriesProvider>
    </BrowserRouter>
  </Provider>
    
  </StrictMode>
)
