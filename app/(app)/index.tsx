import { ActivityIndicator } from "react-native"

import { Text, View, Button } from "@/components"
import { useAuth, useSignOut } from "@/features/auth"
import { cn } from "@/lib"

export default function Index() {
	const { user } = useAuth()
	const signOut = useSignOut({})

	return (
		<View className={ cn("flex-1", "justify-center", "items-center", "bg-primary", "dark:bg-primary-dark") }>
			<Text className={ cn("text-xl", "mb-4", "text-gray-900", "dark:text-white") }>
				Welcome, { user?.email }!
			</Text>
			<Button
				className={ cn("bg-red-600", signOut.isPending && "opacity-50") }
				onPress={ () => signOut.mutate() }
				disabled={ signOut.isPending }
			>
				{ signOut.isPending
					? <ActivityIndicator color="#fff" />
					: <Text className={ cn("text-white", "font-semibold") }>Sign Out</Text> }
			</Button>
		</View>
	)
}

