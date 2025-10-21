import { ReactNode } from "react"
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native"

import { cn } from "@/lib"

import { Text } from "../Text"

export interface ButtonProps extends TouchableOpacityProps {
	children: ReactNode
	className?: string
	textClassName?: string
	isLoading?: boolean
	variant?: "primary" | "secondary" | "ghost"
}

export function Button({
	children,
	className,
	textClassName,
	isLoading = false,
	variant = "primary",
	disabled,
	...props
}: ButtonProps) {
	const variantStyles = {
		primary: "bg-blue-600",
		secondary: "bg-gray-600",
		ghost: "bg-transparent",
	}

	const variantTextStyles = {
		primary: "text-white",
		secondary: "text-white",
		ghost: "text-blue-600",
	}

	return (
		<TouchableOpacity
			className={ cn(
				"rounded-lg",
				"py-3",
				"items-center",
				variantStyles[variant],
				(isLoading || disabled) && "opacity-50",
				className
			) }
			disabled={ isLoading || disabled }
			{ ...props }
		>
			{ isLoading
				? <ActivityIndicator color={ variant === "ghost" ? "#2563eb" : "#fff" } />
				: typeof children === "string"
					? <Text className={ cn("font-semibold", "text-base", variantTextStyles[variant], textClassName) }>{ children }</Text>
					: children
			}
		</TouchableOpacity>
	)
}

