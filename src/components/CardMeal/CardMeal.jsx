import { FaRegCheckCircle } from "react-icons/fa";
import "./cardMeal.css"

export default function CardMeal({name, time, mealRegister, image }) {
    const iconTimeMeal = {
        "Café da Manhã": "☀️",
        "Lanche da Manhã": "🍎",
        "Almoço": "🍽️",
        "Lanche da Tarde": "☕",
        "Jantar": "🌙"
    }

    const timeFormat = time.split(':').slice(0, 2).join(':');
    const icon = iconTimeMeal[name]

    const regiter = mealRegister.find(r => r.name === name)

    return (
        <div className={`meal ${image ? "with-photo" : ""}`}>
            <div className="left">
                {image && (
                    <img src={image} alt={name} className="meal-photo" />
                )}

                <div className="info">
                    {!image && (
                        <div className="icon">
                            <p>{icon}</p>
                        </div>
                    )}

                    <div className="description">
                        <p className="meal-name">
                            {image && <span className="icon-inline">{icon}</span>}
                            {name}
                        </p>
                        <p className="mealtime">{timeFormat}</p>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className={regiter?.status == "feito" ? "badge-sent" : "badge-pending"}>
                    <FaRegCheckCircle className="check-circle" />
                    <span>{regiter?.status ? "Enviado" : "Pendente"}</span>
                </div>
            </div>
        </div>
    )
}