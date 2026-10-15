import { FaChevronLeft , FaCamera, FaRegImage } from "react-icons/fa";
import "./registerMeal.css"
import { useEffect, useRef, useState } from "react";
import { Text, Textarea } from "@mantine/core";
import { useNavigate, useLocation, useParams } from "react-router";
import api from "../../api";

export default function Register() {
    const { id } = useParams()
    const [activeButton, setActiveButton] = useState(null)
    const [obs, setObs] = useState("")

    // Estado para guardar o arquivo real (que será enviado ao servidor)
    const [imageFile, setImageFile] = useState(null)

    // Estado para mostrar a imagem na tela (o link temporário)
    const [imagePreview, setImagePreview] = useState(null)

    // Referência para "esconder" o input de arquivo padrão do HTML
    const camInputRef = useRef(null)
    const fileInputRef = useRef(null)

    const location = useLocation()

    const maxLength = 150
    
    const [meal, setMeal] = useState(location.state || null)

    const navigate = useNavigate()

    useEffect(() => {
        if(!meal) {
            // Só busca se não veio via state (ex: F5 na página)
            api.get(`mealPlan/${id}`).then((response) => {
                setMeal(response.data)
            })
        }
    }, [id, meal])

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file) {
            setImageFile(file)

            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    async function addMeal(){
        if (!imageFile){
            alert("A foto da refeição é obrigatória")
            return
        }

        try{
            const formData = new FormData()

            formData.append("photo", imageFile)
            formData.append("id_plan", id)
            formData.append("observation", obs)

            await api.post('/mealRegister', formData)

            alert("Sucesso")
            navigate("/home")
        } catch (error) {
            console.log(error)

            alert("Erro")
        }
    }

    return (
        <div className="container-register">
            <header>
                <div className="interface">
                    <FaChevronLeft onClick={() => navigate("/home")} className="icon-register"/>

                    <span className="title-register">Registrar Refeição</span>

                </div>
            </header>

            <div className="interface">
                <p className="meal-title-hour">{meal.name} <span>- {meal.time.slice(0, 5)}</span></p>

                <div className="wrap-image">
                    <div className="food-image">
                        {imagePreview ? <img src={imagePreview} alt="foto da refeição" /> : <span>Sem imagem</span>}
                    </div>

                    {/* INPUT INVISÍVEL 1: Para abrir a Câmera */}
                    <input 
                        type="file" 
                        accept="image/*"
                        capture="environment"
                        ref={camInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    {/* INPUT INVISÍVEL 2: Para abrir a galeria */}
                    <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    <div className="wrap-buttons-image">
                        <button
                            className={activeButton === 1 ? 'active' : ''}
                            onClick={() => {
                                setActiveButton(1)
                                camInputRef.current.click()
                            }}
                            
                        >
                            <FaCamera /> Tirar foto
                        </button>

                        <button
                            className={activeButton === 2 ? 'active' : ''}
                            onClick={() => {
                                setActiveButton(2)
                                fileInputRef.current.click()
                            }}
                        >
                            <FaRegImage /> Escolher da galeria
                        </button>
                    </div>
                </div>

                <div className="observation">
                    <Textarea 
                        label="Observação (opcional)"
                        rows={5}
                        value={obs}
                        onChange={(e) => setObs(e.currentTarget.value.slice(0, maxLength))}
                        bottomSection={
                            <Text size="xs" c="dimmed">
                                {obs.length} / {maxLength} caracteres
                            </Text>
                        }
                    />
                </div>

                <button className="send" onClick={addMeal}>ENVIAR</button>
            </div>
        </div>
    )
}