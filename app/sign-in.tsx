import { router } from "expo-router"
import { useState } from "react"
import { Alert } from "react-native"

import { Button, Link, Text, TextInput, View } from "@/components"
import { useSignIn } from "@/features/auth"
import { cn } from "@/lib"

export default function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const signIn = useSignIn({})

	const handleSignIn = async() => {
		if(!email || !password) {
			Alert.alert("Error", "Please fill in all fields")
			return
		}

		signIn.mutate(
			{ email, password },
			{
				onSuccess: () => {
					router.replace("/")
				},
				onError: (error) => {
					Alert.alert("Error", error instanceof Error ? error.message : "An error occurred")
				},
			}
		)
	}

	return (
		<View className={ cn("flex-1", "justify-center", "px-6", "bg-primary", "dark:bg-primary-dark") }>
			<Text className={ cn("text-3xl", "font-bold", "mb-8", "text-center") }>
				Sign In
			</Text>

			<View className={ cn("space-y-4") }>
				<View>
					<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
						Email
					</Text>
					<TextInput
						placeholder="your@email.com"
						value={ email }
						onChangeText={ setEmail }
						autoCapitalize="none"
						keyboardType="email-address"
						autoComplete="email"
					/>
				</View>

				<View className={ cn("mt-4") }>
					<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
						Password
					</Text>
					<TextInput
						placeholder="••••••••"
						value={ password }
						onChangeText={ setPassword }
						secureTextEntry
						autoComplete="password"
					/>
				</View>

				<Button
					className={ cn("mt-6") }
					onPress={ handleSignIn }
					isLoading={ signIn.isPending }
				>
					Sign In
				</Button>

				<View className={ cn("flex-row", "justify-center", "mt-4") }>
					<Text>Don&apos;t have an account? </Text>
					<Link href="/sign-up" className={ cn("font-semibold") }>
						Sign Up
					</Link>
				</View>
			</View>
		</View>
	)
}

