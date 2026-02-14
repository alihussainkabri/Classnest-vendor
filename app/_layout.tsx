import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (

    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Auth/Welcome" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Auth/Login" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Auth/Verification" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Auth/Success" options={{ presentation: 'modal', title: 'yes' }} />

          <Stack.Screen name="Vendor/SetupScreen1" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/SetupScreen2" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/SelectCourses" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/ReviewDetails" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/DetailSuccess" options={{ presentation: 'modal', title: 'yes' }} />

          <Stack.Screen name="Vendor/ListingClass1" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/ListingClass2" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/ListingClass3" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/InstructorsList" options={{ presentation: 'modal', title: 'yes' }} />
          <Stack.Screen name="Vendor/AddInstructors" options={{ presentation: 'modal', title: 'yes' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>

  );
}
