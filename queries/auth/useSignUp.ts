import { type Session, type User } from "@supabase/supabase-js"
import { useMutation } from "@tanstack/react-query"

import { supabase } from "@/lib/supabase"

import { type ReactMutationFunction } from ".."

interface SignUpCredentials {
	email: string
	password: string
}

interface SignUpResult {
	user: User | null
	session: Session | null
}

export const useSignUp: ReactMutationFunction<
	SignUpResult,
	SignUpCredentials
> = (options) => {
	return useMutation({
		mutationKey: ["auth", "sign-up"],
		mutationFn: async({ email, password }: SignUpCredentials): Promise<SignUpResult> => {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			})
			console.log({ data, error })
			if(error) {
				throw error
			}

			return data
		},
		...options,
	})
}

