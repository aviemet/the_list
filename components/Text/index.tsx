import { Text as RNText, TextProps as RNTextProps } from "react-native"

import { cn } from "@/lib"

interface TextProps extends RNTextProps {
	className?: string
}

export function Text({ className, ...props }: TextProps) {
	return (
		<RNText
			className={ cn("text-gray-900", "dark:text-white", className) }
			{ ...props }
		/>
	)
}

