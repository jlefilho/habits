import { StatusBar, Text } from 'react-native';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading';

export default function App() {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold  
  })

  if (!isFontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Text style={{ fontFamily: 'Inter_800ExtraBold' }}>
        Hello World
      </Text>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
    </>
  );
}

