import { Controller, type FieldValues, type Path } from "react-hook-form"

import ConditionalWrapper from "@/components/ConditionalWrapper"
import { TextInput, type TextInputProps } from "@/components/Inputs"

import { FormField, useFormContext } from "../index"

interface FormTextInputProps<TFieldValues extends FieldValues> extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
	name: Path<TFieldValues>
	field?: boolean
	label?: string
	wrapperClassName?: string
}

export function FormTextInput<TFieldValues extends FieldValues>({ name, field = true, label, wrapperClassName, ...props }: FormTextInputProps<TFieldValues>) {
	const { control } = useFormContext()

	return (
		<ConditionalWrapper
			condition={ field }
			wrapper={ childs => (
				<FormField
					name={ name }
					label={ label }
					className={ wrapperClassName }
				>
					{ childs }
				</FormField>
			) }
		>
			<Controller
				control={ control }
				name={ name }
				render={ ({ field: { onChange, onBlur, value } }) => (
					<TextInput
						value={ value }
						onChangeText={ onChange }
						onBlur={ onBlur }
						{ ...props }
					/>
				) }
			/>
		</ConditionalWrapper>
	)
}

