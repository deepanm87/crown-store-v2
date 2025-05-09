import Home from "./routes/home/home"
import Navigation from "./routes/navigation/navigation"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
