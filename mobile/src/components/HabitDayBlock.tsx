import { TouchableOpacity, Dimensions } from "react-native";

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5
export const habitDayBlockMarginBetween = 8
export const habitDayBlockSize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)


export function HabitDayBlock() {
    return (
        <TouchableOpacity
            className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1"
            style={{ width: habitDayBlockSize, height: habitDayBlockSize }}
            activeOpacity={0.7}
        />

    )
}