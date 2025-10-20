import { zodResolver } from "@hookform/resolvers/zod"
import { type DefaultValues, type FieldValues, type Resolver, type SubmitHandler, type UseFormReturn } from "react-hook-form"
import { useForm as useReactHookForm } from "react-hook-form"
import { type z } from "zod"

import { createContext } from "@/lib"

type FormContextValue = UseFormReturn & {
	handleFormSubmit: () => void
}

const [useFormContext, FormProvider] = createContext<FormContextValue>()
export { useFormContext }

interface FormProps<TValues extends FieldValues> {
	children: React.ReactNode
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
	const form = useReactHookForm<TValues>({
		resolver: zodResolver(schema) as Resolver<TValues>,
		defaultValues,
	})

	const handleFormSubmit = form.handleSubmit(async(data: TValues) => {
		try {
			await onSubmit(data)
			onSuccess?.()
		} catch(error) {
			onError?.(error)
		}
	})

	return (
		<FormProvider value={ { ...form, handleFormSubmit } as FormContextValue }>
			{ children }
		</FormProvider>
	)
}
