import "./topLayout.css"
import { FaRegBell } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function TopLayout() {
    const [name, setName] = useState("")

    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    useEffect(() => {
        const savedName = localStorage.getItem("name")
        setName(savedName || "")
    }, [])

    return (
        <header className="container-top">
            <div className="interface">
                <div className="left-top">
                    <span> Bom dia, {name}! ☀️</span>
                    <span>{today}</span>
                </div>

                <div className="right-top">
                    <FaRegBell className="icon-bell" />
                </div>
            </div>
        </header>
    )
}