import { Redirect, router } from "expo-router"
import { ActivityIndicator, Alert } from "react-native"
import { z } from "zod"

import { Form, FormSubmitButton, FormTextInput, Link, Text, View } from "@/components"
import { useAuth, useSignUp } from "@/features/auth"
import { cn } from "@/lib"

const signUpSchema = z.object({
	email: z.email({ message: "Invalid email address" }).min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
	const { user, isLoading } = useAuth()
	const signUp = useSignUp({})

	const handleSubmit = (data: SignUpForm) => {
		signUp.mutate(
			{ email: data.email, password: data.password },
			{
				onSuccess: () => {
					Alert.alert(
						"Success",
						"Account created! Please check your email to verify your account."
					)
					router.replace("/sign-in")
				},
				onError: (error) => {
					Alert.alert("Error", error instanceof Error ? error.message : "An error occurred")
				},
			}
		)
	}

	if(isLoading) {
		return (
			<View className={ cn("flex-1", "justify-center", "items-center", "bg-primary", "dark:bg-primary-dark") }>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	if(user) {
		return <Redirect href="/" />
	}

	return (
		<Form
			schema={ signUpSchema }
			defaultValues={ {
				email: "",
				password: "",
				confirmPassword: "",
			} }
			onSubmit={ handleSubmit }
		>
			<View className={ cn("flex-1", "justify-center", "px-6", "bg-primary", "dark:bg-primary-dark") }>
				<Text className={ cn("text-3xl", "font-bold", "mb-8", "text-center") }>
					Sign Up
				</Text>

				<View className={ cn("space-y-4") }>
					<FormTextInput<SignUpForm>
						name="email"
						label="Email"
						placeholder="your@email.com"
						autoCapitalize="none"
						keyboardType="email-address"
						autoComplete="email"
					/>

					<FormTextInput<SignUpForm>
						name="password"
						label="Password"
						placeholder="••••••••"
						secureTextEntry
						autoComplete="password-new"
						wrapperClassName={ cn("mt-4") }
					/>

					<FormTextInput<SignUpForm>
						name="confirmPassword"
						label="Confirm Password"
						placeholder="••••••••"
						secureTextEntry
						autoComplete="password-new"
						wrapperClassName={ cn("mt-4") }
					/>

					<FormSubmitButton
						className={ cn("mt-6") }
						isLoading={ signUp.isPending }
					>
						Sign Up
					</FormSubmitButton>

					<View className={ cn("flex-row", "justify-center", "mt-4") }>
						<Text>Already have an account? </Text>
						<Link href="/sign-in" className={ cn("font-semibold") }>
							Sign In
						</Link>
					</View>
				</View>
			</View>
		</Form>
	)
}

