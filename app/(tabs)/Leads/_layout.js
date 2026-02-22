import { Stack } from 'expo-router';
import { fonts } from '../../../config/Config';

export default function LeadsLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: 'white' },
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 18,
                fontFamily: fonts.IntBold
            },
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="InterestedSeekers" />
        </Stack>
    );
}