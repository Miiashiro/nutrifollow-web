import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Interceptor de RESPOSTA — desloga automaticamente se o token for inválido/expirado
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token')
//             localStorage.removeItem('user_id')
//             localStorage.removeItem('name')
//             window.location.href = '/'
//         }
//         return Promise.reject(error)
//     }
// )

export default api