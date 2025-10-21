import { useState } from "react"
import { ActivityIndicator, ScrollView } from "react-native"

import { Text, View, Button, TextInput } from "@/components"
import { useSignOut } from "@/features/auth"
import { cn } from "@/lib"

export default function Index() {
	const signOut = useSignOut({})
	const [searchQuery, setSearchQuery] = useState("")

	return (
		<View className={ cn("flex-1", "bg-primary", "dark:bg-primary-dark") }>
			<View className={ cn("pt-12", "px-4", "pb-4", "bg-white", "dark:bg-gray-900", "border-b", "border-gray-200", "dark:border-gray-800") }>
				<View className={ cn("flex-row", "justify-between", "items-center", "mb-4") }>
					<Text className={ cn("text-2xl", "font-bold", "text-gray-900", "dark:text-white") }>
						Dashboard
					</Text>
					<Button
						className={ cn("bg-red-600", "px-4", "py-2", signOut.isPending && "opacity-50") }
						onPress={ () => signOut.mutate() }
						disabled={ signOut.isPending }
					>
						{ signOut.isPending
							? <ActivityIndicator color="#fff" size="small" />
							: <Text className={ cn("text-white", "text-sm", "font-semibold") }>Sign Out</Text> }
					</Button>
				</View>

				<TextInput
					value={ searchQuery }
					onChangeText={ setSearchQuery }
					placeholder="Search for movies, TV shows, books..."
					className={ cn("text-base") }
				/>
			</View>

			<ScrollView className={ cn("flex-1", "px-4", "pt-6") }>
				<Text className={ cn("text-lg", "font-semibold", "text-gray-900", "dark:text-white", "mb-4") }>
					Recommendations
				</Text>

				<View className={ cn("items-center", "justify-center", "py-12") }>
					<Text className={ cn("text-gray-900", "dark:text-white", "text-center") }>
						Placeholder for recommendations
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}

