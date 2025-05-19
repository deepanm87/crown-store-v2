import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { store, persistor } from "./store/store"
import { PersistGate } from "redux-persist/integration/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
