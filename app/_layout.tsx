import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import ToastManager from 'toastify-react-native';
import { UserContext } from '../context/UserContext';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { url } from '../helpers';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [token, setToken] = useState(null)

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const account = await AsyncStorage.getItem("classnest_vendor");
        
        if (account) {
          const account_data = JSON.parse(account);
          

          if (account_data.token) {
            setToken(account_data.token)
            const response = await fetch(url + "fetch-current-vendor-progress", {
              headers: {
                "Authorization": `Bearer ${account_data?.token}`
              }
            })

            if (response.ok == true) {
              const data = await response.json()

              if (data?.status == 200) {
                let totalCompleted = 0;
                let totalFields = 0;

                data.list.forEach(item => {
                  totalFields += item.number_of_checker;
                  totalCompleted += item.total_field;
                });

                const percentage = ((totalCompleted / totalFields) * 100).toFixed(2);

                setTimeout(() => {
                  router.replace({
                    pathname: 'Vendor/ProfileStatus',
                    params: {
                      percentage,
                      list: JSON.stringify(data?.list)
                    }
                  });
                }, 0);
              } else {
                setTimeout(() => {
                  router.replace({
                    pathname: 'Vendor/ProfileStatus',
                    params: {
                      percentage: 0,
                      list: JSON.stringify([])
                    }
                  });
                }, 0);
              }
            }
          }
        }else{
          router.replace("Auth/Welcome")
        }
      } catch (err) {
        console.log("Storage error:", err);
      }
    };

    loadAccount();
  }, []);


  return (

    <>
      <ToastManager />
      <UserContext>
        <GluestackUIProvider mode="dark">
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{
              headerShown: false
            }}>
              {token != null ? <>
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
                <Stack.Screen name="Vendor/ReceiveEnquiries" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Vendor/UploadClassImage" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Vendor/ProfileStatus" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Vendor/UploadAwards" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Vendor/UploadCertificate" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </> : <>
                <Stack.Screen name="Auth/Welcome" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Auth/Login" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Auth/Verification" options={{ presentation: 'modal', title: 'yes' }} />
                <Stack.Screen name="Auth/Success" options={{ presentation: 'modal', title: 'yes' }} />
              </>}
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </GluestackUIProvider>
      </UserContext>
    </>
  );
}
