import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}