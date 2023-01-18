import { View, Text, ScrollView } from "react-native";

import { HabitDayBlock, habitDayBlockSize } from "../components/HabitDayBlock";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-days-from-year-beginning.ts";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minDayBlocks = 18 * 7 //18 weeks * 7 days
const amountOfDaysToFill = minDayBlocks - datesFromYearStart.length

export function Home() {
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
                <View className="flex-row flex-wrap ">
                    {
                        datesFromYearStart.map(date => (
                            <HabitDayBlock
                                key={date.toISOString()}
                            />
                        ))
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
            </ScrollView>

        </View>
    )
}