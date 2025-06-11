import { useEffect, lazy, Suspense } from "react"
import { checkUserSession } from "./store/user/user.action"
import { useDispatch } from "react-redux"
import Spinner from "./components/spinner/spinner"
import { Route, Routes } from "react-router-dom"
import { GlobalStyle } from "./global.styles.js"

const Home = lazy(() => import('./routes/home/home'))
const Authentication = lazy(() => import ('./routes/authentication/authentication'))
const Navigation = lazy( () => import('./routes/navigation/navigation'))
const Shop = lazy( () => import('./routes/shop/shop'))
const Checkout = lazy( () => import('./routes/checkout/checkout'))

const App = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(checkUserSession())
  }, [])

  return(
    <Suspense fallback={<Spinner />}>
    <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
