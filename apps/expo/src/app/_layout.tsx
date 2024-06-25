import '@bacons/text-decoder/install'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

import { TRPCProvider } from '~/utils/api'

import '../styles.css'

export default function RootLayout() {
  const { colorScheme } = useColorScheme()
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme == 'dark' ? '#000000' : '#FFFFFF' },
          contentStyle: { backgroundColor: colorScheme == 'dark' ? '#000000' : '#FFFFFF' }
        }}
      />
      <StatusBar />
    </TRPCProvider>
  )
}
