import { Stack } from 'expo-router';

export default function ClassesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PromoteClasses" />
      <Stack.Screen name="ClassDetails" />
    </Stack>
  );
}