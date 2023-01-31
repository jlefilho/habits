import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import Animated, { RotateInUpLeft, RotateInDownRight } from "react-native-reanimated";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface HabitCheckboxProps extends TouchableOpacityProps {
    title: string
    checked?: boolean
}

export function HabitCheckbox({ checked = false, title, ...rest }: HabitCheckboxProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row mb-2 items-center"
            {...rest}        
        >

            {checked ? (
                <Animated.View
                    className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
                    entering={RotateInUpLeft}
                    exiting={RotateInDownRight}
                >
                    <Feather name="check" size={20} color={colors.white} />
                </Animated.View>
            ) : (
                <View className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg" />
            )}

            <Text className="text-white text-base ml-3 font-semibold">
                {title}
            </Text>
            
        </TouchableOpacity>
    )
}