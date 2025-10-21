import { Session, User } from "@supabase/supabase-js"
import { useEffect, useState, type ReactNode } from "react"

import { createContext } from "@/lib"
import { supabase } from "@/lib/supabase"

interface AuthContextValue {
	session: Session | null
	user: User | null
	isLoading: boolean
}

const [useAuth, AuthContextProvider] = createContext<AuthContextValue>()
export { useAuth }

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<Session | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
			setIsLoading(false)
		})

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	const value: AuthContextValue = {
		session,
		user: session?.user ?? null,
		isLoading,
	}

	return (
		<AuthContextProvider value={ value }>
			{ children }
		</AuthContextProvider>
	)
}
