import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from "react-native"

import { cn } from "@/lib"

interface TextInputProps extends RNTextInputProps {
	className?: string
}

export function TextInput({ className, placeholderTextColor = "#999", ...props }: TextInputProps) {
	return (
		<RNTextInput
			className={ cn(
				"border",
				"border-gray-300",
				"dark:border-gray-600",
				"rounded-lg",
				"px-4",
				"py-3",
				"text-gray-900",
				"dark:text-white",
				"bg-white",
				"dark:bg-gray-800",
				className
			) }
			placeholderTextColor={ placeholderTextColor }
			{ ...props }
		/>
	)
}

