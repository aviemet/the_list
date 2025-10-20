import { Text, View } from "react-native"

import { cn } from "@/lib"

export default function Index() {
	return (
		<View className={ cn("flex-1", "justify-center", "items-center") }>
			<Text>Edit app/index.tsx to edit this screen.</Text>
		</View>
	)
}
