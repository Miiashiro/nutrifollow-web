import React from "react"
import "./topLayout.css"
import { FaRegBell } from "react-icons/fa";

export default function TopLayout({ name }) {
    return (
        <header className="container-top">
            <div className="interface">
                <div className="left-top">
                    <span> Bom dia, {name}! ☀️</span>
                    <span>Segunda feira, 31 de agosto</span>
                </div>

                <div className="right-top">
                    <FaRegBell />
                </div>
            </div>
        </header>
    )
}