import { Redirect, router } from "expo-router"
import { ActivityIndicator, Alert } from "react-native"
import { z } from "zod"

import { Form, FormSubmitButton, FormTextInput, Link, Text, View } from "@/components"
import { useAuth, useSignIn } from "@/features/auth"
import { cn } from "@/lib"

const signInSchema = z.object({
	email: z.email({ message: "Invalid email address" }).min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignIn() {
	const { user, isLoading } = useAuth()
	const signIn = useSignIn({})

	const handleSubmit = (data: SignInForm) => {
		signIn.mutate(
			{ email: data.email, password: data.password },
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
			schema={ signInSchema }
			defaultValues={ {
				email: "",
				password: "",
			} }
			onSubmit={ handleSubmit }
		>

			<View className={ cn("flex-1", "justify-center", "px-6", "bg-primary", "dark:bg-primary-dark") }>
				<Text className={ cn("text-3xl", "font-bold", "mb-8", "text-center") }>
					Sign In
				</Text>

				<View className={ cn("space-y-4") }>
					<FormTextInput<SignInForm>
						name="email"
						label="Email"
						placeholder="your@email.com"
						autoCapitalize="none"
						keyboardType="email-address"
						autoComplete="email"
					/>

					<FormTextInput<SignInForm>
						name="password"
						label="Password"
						placeholder="••••••••"
						secureTextEntry
						autoComplete="password"
						wrapperClassName={ cn("mt-4") }
					/>

					<FormSubmitButton
						className={ cn("mt-6") }
						isLoading={ signIn.isPending }
					>
						Sign In
					</FormSubmitButton>

					<View className={ cn("flex-row", "justify-center", "mt-4") }>
						<Text>Don&apos;t have an account? </Text>
						<Link href="/sign-up" className={ cn("font-semibold") }>
							Sign Up
						</Link>
					</View>
				</View>
			</View>
		</Form>
	)
}

