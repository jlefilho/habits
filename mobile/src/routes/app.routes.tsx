import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home'
import { NewHabit } from '../screens/NewHabit'
import { HabitDetails } from '../screens/HabitDetails'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='home'
                component={Home}
            />

            <Screen
                name='newHabit'
                component={NewHabit}
            />

            <Screen
                name='habitDetails'
                component={HabitDetails}
            />
        </Navigator>
    )
}

