import { Button } from "@/components/Button"
import { type ButtonProps } from "@/components/Button"

import { useFormContext } from "../index"

type FormSubmitButtonProps = Omit<ButtonProps, "onPress">

export function FormSubmitButton({ children, ...props }: FormSubmitButtonProps) {
	const { handleFormSubmit } = useFormContext()

	return (
		<Button onPress={ handleFormSubmit } { ...props }>
			{ children }
		</Button>
	)
}

