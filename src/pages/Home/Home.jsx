import { useEffect, useState } from "react"
import TopLayout from "../../components/TopLayout/TopLayout"
import BottomLayout from "../../components/BottomLayout/BottomLayout"
import api from "../../api"
import "./home.css"
import { RingProgress, Text } from '@mantine/core'
import CardMeal from "../../components/CardMeal/CardMeal"

export default function Home() {
    const [mealPlan, setMealPlan] = useState([])
    const [mealRegister, setMealRegister] = useState([])

    async function getData() {
        try {
            const [responsePlan, responseRegister] = await Promise.all([
                api.get('mealPlan'),
                api.get('mealRegister')
            ])

            setMealPlan(responsePlan.data || [])
            setMealRegister(responseRegister.data)
        } catch (error) {
            console.error("Erro ao buscar o plano de refeição:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const calcMealServed = () => {
        const quantSent = mealRegister.filter(register => register.status === "feito").length
        const quantTotal = mealRegister.length

        const calcPorcent = quantTotal > 0 ? quantSent / quantTotal * 100 : 0

        return {
            calcPorcent,
            quantSent,
            quantTotal
        }
    }

    return (
        <div className="home">
            <TopLayout />

            <div className="interface">
                <div className="card-mission">
                    <div className="card-txt">
                        <p>Sua Missão de Hoje</p>
                        <p>Registre todas as suas refeições e mantenha a constância</p>
                    </div>
                    <div className="graphic">
                        <RingProgress className="ringProgress"
                            size={100}
                            thickness={11}
                            sections={[{ value: calcMealServed().calcPorcent, color: 'violet' }]}
                            label={<Text ta="center" fw={700}>{calcMealServed().calcPorcent}%</Text>}
                        />
                        <p>{calcMealServed().quantSent} de {calcMealServed().quantTotal} refeições</p>
                    </div>
                </div>

                <div className="card-meal">
                    {
                        mealPlan.map((meal, index) => (
                            <CardMeal 
                                index={index}
                                name={meal.name} 
                                time={meal.time_meal}
                                mealRegister={mealRegister} />
                        ))
                    }
                </div>
            </div>

            <BottomLayout />
        </div>
    )
}