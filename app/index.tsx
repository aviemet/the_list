import { Redirect } from "expo-router"
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native"

import { useAuth, useSignOut } from "@/features/auth"
import { cn } from "@/lib"

export default function Index() {
	const { user, isLoading } = useAuth()
	const signOut = useSignOut({})

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

	return (
		<View className={ cn("flex-1", "justify-center", "items-center", "bg-primary", "dark:bg-primary-dark") }>
			<Text className={ cn("text-xl", "mb-4", "text-gray-900", "dark:text-white") }>
				Welcome, { user.email }!
			</Text>
			<TouchableOpacity
				className={ cn("bg-red-600", "rounded-lg", "px-6", "py-3", signOut.isPending && "opacity-50") }
				onPress={ () => signOut.mutate() }
				disabled={ signOut.isPending }
			>
				{ signOut.isPending
					? (
						<ActivityIndicator color="#fff" />
					)
					: (
						<Text className={ cn("text-white", "font-semibold") }>Sign Out</Text>
					) }
			</TouchableOpacity>
		</View>
	)
}
