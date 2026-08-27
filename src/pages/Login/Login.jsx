import React, { useState } from "react"
import "./login.css"
import img from "../../img/logo.png"
import { Input, PasswordInput, Button } from "@mantine/core"
import { Lock, User } from "@phosphor-icons/react"
import api from "../api"
import { useNavigate } from "react-router"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function Login(e){
        e.preventDefault()

        try{
            const dataLogin = {email, password}

            const response = await api.post('/login', dataLogin)
            console.log(response)
            alert("Login com sucesso")
            navigate("/Home")
        } catch(error){
            console.log(error)
            alert("Erro")
        }
    }

    return (
        <div className="login">
            <div className="login-card">
                <div className="logo">
                    <img src={img} alt="Logo" />
                    <p>
                        Acompanhamento Nutricional 
                        <br />
                        em tempo real
                    </p>
                </div>

                <div className="greeting">
                    <p><strong>Bem-Vindo de volta! 👋</strong></p>
                    <p>Entre para continuar</p>
                </div>

                <div className="container-input">
                    <Input
                        placeholder="E-mail"
                        leftSection={<User size={18} />}
                        size="md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        placeholder="Senha"
                        leftSection={<Lock size={18} />}
                        size="md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="forgot">Esqueci minha senha</p>

                    <Button fullWidth size="md" className="enter-btn" onClick={Login}>Entrar</Button>
                </div>
            </div>
        </div>
    )
}