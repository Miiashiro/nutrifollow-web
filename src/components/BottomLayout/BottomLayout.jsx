import { NavLink } from "react-router";
import "./bottomLayout.css"
import { FaCalendarMinus, FaUser, FaClock, FaCommentDots} from "react-icons/fa";


export default function BottomLayout(){
    const menuItem = [
        {
            path: "/home",
            name: "Hoje",
            icon: <FaCalendarMinus />
        },
        {
            path: "/historico",
            name: "Histórico",
            icon: <FaClock />
        },
        {
            path: "/mensagem",
            name: "Mensagem",
            icon: <FaCommentDots />
        },
        {
            path: "/perfil",
            name: "Perfil",
            icon: <FaUser />
        }
    ]

    return(
        <div className="container-bottom">
            <div className="interface">
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link-bar">
                            <div className="icon">{item.icon}</div>
                            <div className="name">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}