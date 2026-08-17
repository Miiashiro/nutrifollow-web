import "./login.css"
import img from "../../img/logo.png"
import { Input, PasswordInput, Button } from "@mantine/core"
import { Lock, User } from "@phosphor-icons/react"

export default function Login() {
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
                    />

                    <PasswordInput
                        placeholder="Senha"
                        leftSection={<Lock size={18} />}
                        size="md"
                    />

                    <p className="forgot">Esqueci minha senha</p>

                    <Button fullWidth size="md" className="enter-btn">Entrar</Button>
                </div>
            </div>
        </div>
    )
}