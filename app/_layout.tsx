import "@/global.css"
import { Stack } from "expo-router"

import { PersistQueryClient } from "@/lib/queryClient"


export default function RootLayout() {
	return (
		<PersistQueryClient>
			<Stack />
		</PersistQueryClient>
	)
}
