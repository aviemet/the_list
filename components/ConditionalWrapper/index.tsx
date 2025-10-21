interface ConditionalWrapperProps {
	children: React.ReactNode
	condition: boolean
	wrapper: (children: React.ReactNode) => React.JSX.Element
	elseWrapper?: (children: React.ReactNode) => React.JSX.Element
}

const ConditionalWrapper = ({ children, elseWrapper, condition, wrapper }: ConditionalWrapperProps) => {
	if(condition) {
		return wrapper(children)
	} else if(elseWrapper) {
		return elseWrapper(children)
	}

	return children
}

export default ConditionalWrapper
