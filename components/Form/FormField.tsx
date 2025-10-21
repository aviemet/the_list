import { type FieldValues, type Path } from "react-hook-form"

import { Text, View } from "@/components"
import { cn } from "@/lib"

import { useFormContext } from "./index"

interface FormFieldProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>
	label?: string
	children: React.ReactNode
	className?: string
}

export function FormField<TFieldValues extends FieldValues>({ name, label, children, className }: FormFieldProps<TFieldValues>) {
	const { formState: { errors } } = useFormContext()
	const error = errors[name]

	return (
		<View className={ cn(className) }>
			<Text className={ cn("text-sm", "font-medium", "mb-2", "text-gray-700", "dark:text-gray-300") }>
				{ label }
			</Text>
			{ children }
			{ error && (
				<Text className={ cn("text-red-500", "text-sm", "mt-1") }>
					{ String(error.message) }
				</Text>
			) }
		</View>
	)
}

