import { Link as ExpoLink, LinkProps as ExpoLinkProps } from "expo-router"

import { cn } from "@/lib"

interface LinkProps extends ExpoLinkProps {
	className?: string
}

export function Link({ className, ...props }: LinkProps) {
	return (
		<ExpoLink
			className={ cn("text-link", "dark:text-link-dark", className) }
			{ ...props }
		/>
	)
}
