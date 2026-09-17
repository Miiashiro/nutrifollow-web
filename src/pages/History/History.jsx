import { useState, useEffect } from 'react'
import { MiniCalendar } from '@mantine/dates'
import { Select } from '@mantine/core'
import dayjs from 'dayjs'
import "./history.css"
import BottomLayout from '../../components/BottomLayout/BottomLayout'
import api from "../../api"
import CardMeal from '../../components/CardMeal/CardMeal'
dayjs.locale('pt-br')

export default function History() {
    // Formato de String para não dar bugs
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

    // Estado exclusivo para controlar o que aparece na tela (navegação pelas setas)
    const [visibleDate, setVisibleDate] = useState(new Date())

    const yearSelected = dayjs(visibleDate).year()

    const anosDisponiveis = ['2023', '2024', '2025', '2026']
    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

    const formatted = dayjs(selectedDate).format('dddd, D [de] MMMM')
    const txtFormat = formatted.charAt(0).toUpperCase() + formatted.slice(1)


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

    function handleYearChange(value) {
        // Atualiza a seleção
        const updatedSelected = dayjs(selectedDate).year(Number(value)).format('YYYY-MM-DD')
        setSelectedDate(updatedSelected)

        // Atualiza a tela do calendário para pular para o ano escolhido
        const updatedVisible = dayjs(visibleDate).year(Number(value)).toDate()
        setVisibleDate(updatedVisible)
    }

    return (
        <div className="history">
            <div className="interface">
                <span className='title'>Histórico</span>

                <div className="wrap-calendar">
                    <div className="calendar-title">
                        <span className="calendar-month">
                            {dayjs(visibleDate).format('MMMM')}
                        </span>

                        <Select
                            data={anosDisponiveis}
                            value={String(yearSelected)}
                            onChange={handleYearChange}
                        />
                    </div>

                    <MiniCalendar
                        // Controle da visualização (setas agora funcionam livremente)
                        date={visibleDate}
                        onDateChange={setVisibleDate}

                        // Controle da seleção do dia
                        value={selectedDate}
                        onChange={setSelectedDate}

                        numberOfDays={7}
                        size="sm"
                        monthLabelFormat={(date) => diasSemana[dayjs(date).day()]}
                        classNames={{
                            root: 'calendar-root',
                            days: 'calendar-days',
                            day: 'calendar-day',
                            control: 'calendar-control',
                            dayMonth: 'calendar-weekday',
                        }}
                    />
                </div>

                <div className="wrap-meals">
                    <span className='day-format'>{txtFormat}</span>

                    <div className="historic-meal">
                        {
                            mealPlan.map((meal, index) => (
                                <CardMeal
                                    index={index}
                                    name={meal.name}
                                    time={meal.time_meal}
                                    image={"teste"}
                                    mealRegister={mealRegister} />
                            ))
                        }

                    </div>
                </div>
            </div>

            <BottomLayout />
        </div>
    )
}