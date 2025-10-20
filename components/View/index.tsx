import { View as RNView, ViewProps as RNViewProps } from "react-native"

import { cn } from "@/lib"

interface ViewProps extends RNViewProps {
	className?: string
}

export function View({ className, ...props }: ViewProps) {
	return (
		<RNView
			className={ cn(className) }
			{ ...props }
		/>
	)
}

