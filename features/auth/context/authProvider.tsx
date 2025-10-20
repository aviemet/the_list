import { Session, User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

import { supabase } from "@/lib/supabase"

interface AuthContextValue {
	session: Session | null
	user: User | null
	isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

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

	return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if(context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

