import { useMutation } from "@tanstack/react-query"
import type { Session, User, WeakPassword } from "@supabase/supabase-js"

import { supabase } from "@/lib/supabase"
import type { ReactMutationFunction } from ".."

interface SignInCredentials {
	email: string
	password: string
}

interface SignInResult {
	user: User
	session: Session
	weakPassword?: WeakPassword
}

export const useSignIn: ReactMutationFunction<
	SignInResult,
	SignInCredentials
> = (options) => {
	return useMutation({
		mutationKey: ["auth", "sign-in"],
		mutationFn: async({ email, password }: SignInCredentials) => {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if(error) {
				throw error
			}

			return data
		},
		...options,
	})
}

