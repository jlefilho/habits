import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";

import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-days-from-year-beginning.ts";
import { HabitDayBlock, habitDayBlockSize } from "../components/HabitDayBlock";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minDayBlocks = 18 * 7 //18 weeks * 7 days
const amountOfDaysToFill = minDayBlocks - datesFromYearStart.length

type Summary = {
    id: string
    date: string
    amount: number
    completed: number
}[]

export function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [summary, setSummary] = useState<Summary | null>(null)
    const { navigate } = useNavigation()
    
    async function fetchData() {
        try {
            setIsLoading(true)
            
            const response = await api.get('summary')
            
            setSummary(response.data)
            
            console.log(summary)
            
        } catch (e) {
            Alert.alert('Ops!', 'Não foi possível carregar o resumo de hábitos.')
            console.log(e)
            
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            {/* WEEK DAYS HEADER */}
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text 
                            key={`${weekDay}-${i}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{  width: habitDayBlockSize }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            {/* HABIT DAY BLOCKS */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {
                    summary && (
                        <View className="flex-row flex-wrap ">
                            {
                                datesFromYearStart.map(date => {
                                    const dayWithHabits = summary.find(day => {
                                        return dayjs(date).isSame(day.date, 'day')
                                    }) 

                                    return (
                                        <HabitDayBlock
                                            key={date.toISOString()}
                                            date={date}
                                            amountOfHabits={dayWithHabits?.amount}
                                            amountCompleted={dayWithHabits?.completed}
                                            onPress={() => navigate('habitDetails', { date: date.toISOString() })}
                                        />
                                    )
                                })
                            }

                            {
                                amountOfDaysToFill > 0 && Array
                                    .from({ length: amountOfDaysToFill })
                                    .map((_, i) => (
                                        <View
                                            key={i}
                                            className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40"
                                            style={{ width: habitDayBlockSize, height: habitDayBlockSize }}
                                        />
                                    ))
                            }
                        </View>
                    )
                }
            </ScrollView>

        </View>
    )
}