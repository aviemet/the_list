import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Alert } from "react-native"
import { z } from "zod"

import { Button, Link, Text, TextInput, View } from "@/components"
import { useSignUp } from "@/features/auth"
import { cn } from "@/lib"

const signUpSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
	const signUp = useSignUp({})
	const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const onSubmit = (data: SignUpForm) => {
		signUp.mutate(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => {
					Alert.alert(
						"Success",
						"Account created! Please check your email to verify your account.",
						[
							{
								text: "OK",
								onPress: () => router.replace("/sign-in"),
							},
						]
					)
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
				Sign Up
			</Text>

			<View className={ cn("space-y-4") }>
				<View>
					<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
						Email
					</Text>
					<Controller
						control={ control }
						name="email"
						render={ ({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder="your@email.com"
								value={ value }
								onChangeText={ onChange }
								onBlur={ onBlur }
								autoCapitalize="none"
								keyboardType="email-address"
								autoComplete="email"
							/>
						) }
					/>
					{ errors.email && (
						<Text className={ cn("text-red-500", "text-sm", "mt-1") }>
							{ errors.email.message }
						</Text>
					) }
				</View>

				<View className={ cn("mt-4") }>
					<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
						Password
					</Text>
					<Controller
						control={ control }
						name="password"
						render={ ({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder="••••••••"
								value={ value }
								onChangeText={ onChange }
								onBlur={ onBlur }
								secureTextEntry
								autoComplete="password-new"
							/>
						) }
					/>
					{ errors.password && (
						<Text className={ cn("text-red-500", "text-sm", "mt-1") }>
							{ errors.password.message }
						</Text>
					) }
				</View>

				<View className={ cn("mt-4") }>
					<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
						Confirm Password
					</Text>
					<Controller
						control={ control }
						name="confirmPassword"
						render={ ({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder="••••••••"
								value={ value }
								onChangeText={ onChange }
								onBlur={ onBlur }
								secureTextEntry
								autoComplete="password-new"
							/>
						) }
					/>
					{ errors.confirmPassword && (
						<Text className={ cn("text-red-500", "text-sm", "mt-1") }>
							{ errors.confirmPassword.message }
						</Text>
					) }
				</View>

				<Button
					className={ cn("mt-6") }
					onPress={ handleSubmit(onSubmit) }
					isLoading={ signUp.isPending }
				>
					Sign Up
				</Button>

				<View className={ cn("flex-row", "justify-center", "mt-4") }>
					<Text>Already have an account? </Text>
					<Link href="/sign-in" className={ cn("font-semibold") }>
						Sign In
					</Link>
				</View>
			</View>
		</View>
	)
}

