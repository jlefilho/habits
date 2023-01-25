import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import clsx from 'clsx'

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5
export const habitDayBlockMarginBetween = 8
export const habitDayBlockSize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface HabitDayBlockProps extends TouchableOpacityProps {
    amountOfHabits?: number
    amountCompleted?: number
    date: Date
} 

export function HabitDayBlock({ amountOfHabits = 0, amountCompleted = 0, date ,...rest }: HabitDayBlockProps) {
    const amountCompletedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0

    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(today)

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : amountCompletedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : amountCompletedPercentage > 0 && amountCompletedPercentage <= 20,
                ["bg-violet-800 border-violet-600"] : amountCompletedPercentage > 20 && amountCompletedPercentage <= 40,
                ["bg-violet-700 border-violet-500"] : amountCompletedPercentage > 40 && amountCompletedPercentage <= 60,
                ["bg-violet-600 border-violet-500"] : amountCompletedPercentage > 60 && amountCompletedPercentage <= 80,
                ["bg-violet-500 border-violet-400"] : amountCompletedPercentage > 80,
                ["border-white border-4"] : isCurrentDay
            })}
            style={{ width: habitDayBlockSize, height: habitDayBlockSize }}
            activeOpacity={0.7}
            {...rest}
        />

    )
}