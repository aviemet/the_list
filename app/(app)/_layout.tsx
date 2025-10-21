import { Redirect, Stack } from "expo-router"
import { ActivityIndicator } from "react-native"

import { View } from "@/components"
import { useAuth } from "@/features/auth"
import { cn } from "@/lib"

export default function AppLayout() {
	const { user, isLoading } = useAuth()

	if(isLoading) {
		return (
			<View className={ cn("flex-1", "justify-center", "items-center", "bg-primary", "dark:bg-primary-dark") }>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	if(!user) {
		return <Redirect href="/sign-in" />
	}

	return <Stack screenOptions={ { headerShown: false } } />
}

