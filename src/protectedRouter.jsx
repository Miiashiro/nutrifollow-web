import { Navigate, Outlet } from "react-router";

function ProtectedRouter(){
    const auth = localStorage.getItem("token")

    return auth ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRouter