import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { fonts } from '@/config/Config';
import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#002858',
                tabBarInactiveTintColor: '#9DA2A6',
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="Home/Home"
                options={{
                    title: 'Home',
                    tabBarLabel: ({ focused, color }) => (<Text style={{ color, fontFamily: focused ? fonts.IntBold : fonts.IntMed, fontSize: 12 }}>
                        Home
                    </Text>),
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="Classes"
                options={{
                    title: 'Classes',
                    tabBarLabel: ({ focused, color }) => (<Text style={{ color, fontFamily: focused ? fonts.IntBold : fonts.IntMed, fontSize: 12 }}>
                        Classes
                    </Text>),
                    tabBarIcon: ({ color }) => <FontAwesome5 size={21} name="chalkboard-teacher" color={color} />,
                }}
            />
            <Tabs.Screen
                name="Leads/explore"
                options={{
                    title: 'Leads',
                    tabBarLabel: ({ focused, color }) => (<Text style={{ color, fontFamily: focused ? fonts.IntBold : fonts.IntMed, fontSize: 12 }}>
                        Leads
                    </Text>),
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={24} name="account-filter-outline" color={color} />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: ({ focused, color }) => (<Text style={{ color, fontFamily: focused ? fonts.IntBold : fonts.IntMed, fontSize: 12 }}>
                        Profile
                    </Text>),
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="user-circle-o" color={color} />,
                }}
            />
        </Tabs>
    );
}