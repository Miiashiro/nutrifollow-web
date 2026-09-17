import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import History from "./pages/History/History"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Historico" element={<History />}/>
      </Routes>
    </BrowserRouter>
  )
}