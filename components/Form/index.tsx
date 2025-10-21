import { zodResolver } from "@hookform/resolvers/zod"
import { type DefaultValues, type FieldValues, type Resolver, type SubmitHandler, type UseFormReturn } from "react-hook-form"
import { useForm as useReactHookForm } from "react-hook-form"
import { type z } from "zod"

import { createContext } from "@/lib"

import { FormField } from "./FormField"
import { FormSubmitButton } from "./Inputs/SubmitButton"
import { FormTextInput } from "./Inputs/TextInput"

type FormContextValue = UseFormReturn & {
	handleFormSubmit: () => void
}

const [useFormContext, FormProvider] = createContext<FormContextValue>()
export { useFormContext, FormTextInput, FormField, FormSubmitButton }

type FormRenderProps<TValues extends FieldValues> = UseFormReturn<TValues> & {
	handleFormSubmit: () => void
}

interface FormProps<TValues extends FieldValues> {
	children: ((props: FormRenderProps<TValues>) => React.ReactNode) | React.ReactNode
	schema: z.ZodObject<z.ZodRawShape>
	defaultValues?: DefaultValues<TValues>
	onSubmit: SubmitHandler<TValues>
	onError?: (error: unknown) => void
	onSuccess?: () => void
}

export function Form<TValues extends FieldValues>({
	children,
	schema,
	defaultValues,
	onSubmit,
	onError,
	onSuccess,
}: FormProps<TValues>) {
	const methods = useReactHookForm<TValues>({
		resolver: zodResolver(schema) as Resolver<TValues>,
		defaultValues,
	})

	const handleFormSubmit = methods.handleSubmit(async(data: TValues) => {
		try {
			await onSubmit(data)
			onSuccess?.()
		} catch(error) {
			onError?.(error)
		}
	})

	const contextValue = { ...methods, handleFormSubmit } as FormContextValue

	return (
		<FormProvider value={ contextValue }>
			{ typeof children === "function" ? children(contextValue as FormRenderProps<TValues>) : children }
		</FormProvider>
	)
}
