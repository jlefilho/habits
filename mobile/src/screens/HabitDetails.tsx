import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { HabitCheckbox } from "../components/HabitCheckbox";

interface HabitDetailsParams {
    date: string
}

export function HabitDetails() {
    const route = useRoute()
    const { date } = route.params as HabitDetailsParams

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

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

                <ProgressBar progress={50} />

                <View className="mt-6">
                    <HabitCheckbox
                        title="Beber 2L de água"
                        checked
                    />

                    <HabitCheckbox
                        title="Caminhar 5km"
                        checked={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}