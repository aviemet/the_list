import { useMutation } from "@tanstack/react-query"

import { supabase } from "@/lib/supabase"

import { type ReactMutationFunction } from ".."

export const useSignOut: ReactMutationFunction<void, void> = (options) => {
	return useMutation({
		mutationKey: ["auth", "sign-out"],
		mutationFn: async() => {
			const { error } = await supabase.auth.signOut()

			if(error) {
				throw error
			}
		},
		...options,
	})
}

