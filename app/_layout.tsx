import "@/global.css"
import { Stack } from "expo-router"

import { AuthProvider } from "@/features/auth"
import { PersistQueryClient } from "@/lib/queryClient"


export default function RootLayout() {
	return (
		<PersistQueryClient>
			<AuthProvider>
				<Stack screenOptions={ { headerShown: false } } />
			</AuthProvider>
		</PersistQueryClient>
	)
}
