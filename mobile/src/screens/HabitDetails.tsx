import { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import dayjs from "dayjs";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { HabitCheckbox } from "../components/HabitCheckbox";
import { Loading } from "../components/Loading";
import { EmptyHabitsList } from "../components/EmptyHabitsList";

interface HabitDetailsParams {
    date: string
}

interface HabitDetailsProps {
    completedHabits: string[]
    possibleHabits: {
        id: string
        title: string
    }[]
}

export function HabitDetails() {
    const [habitDetails, setHabitDetails] = useState<HabitDetailsProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const route = useRoute()
    const { date } = route.params as HabitDetailsParams

    const parsedDate = dayjs(date)
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitProgress = habitDetails?.possibleHabits.length 
        ? generateProgressPercentage(habitDetails.possibleHabits.length, completedHabits.length) 
        : 0

    async function fetchHabits() {
        try {
            setIsLoading(true)

            const response = await api.get('/day', {
                params: {
                    date
                }
            })

            setHabitDetails(response.data)
            setCompletedHabits(response.data.completedHabits)

        } catch (e) {
            console.log(e)
            Alert.alert('Ops!', 'Não foi possível carregar as informações dos hábitos.')

        } finally {
            setIsLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`)

            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }

        } catch (e) {
            console.log(e)
            Alert.alert('Ops!', 'Não foi possível atualizar o status do hábito.')
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={habitProgress} />

                <View className={clsx("mt-6", {
                    ["opacity-30"]: isDateInPast
                })}>
                    {
                        habitDetails?.possibleHabits
                            ? habitDetails?.possibleHabits.map(habit => (
                                <HabitCheckbox
                                    key={habit.id}
                                    title={habit.title}
                                    checked={completedHabits.includes(habit.id)}
                                    disabled={isDateInPast}
                                    onPress={() => handleToggleHabit(habit.id)}
                                />
                            ))
                            : <EmptyHabitsList />
                    }
                </View>

                {
                    isDateInPast && (
                        <Text className="text-white mt-10 text-center">
                            Você não pode editar hábitos de uma data passada.
                        </Text>
                    )

                }
            </ScrollView>
        </View>
    )
}