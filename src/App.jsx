import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import History from "./pages/History/History"
import ProtectedRouter from "./protectedRouter"
import Error from "./pages/Error/Error"
import RegisterMeal from "./pages/Register/RegisterMeal"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Historico" element={<History />} />
          <Route path="/Registro/:id" element={<RegisterMeal />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}