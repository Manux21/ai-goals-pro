export type TInputElement = "input" | "select" | "textarea"

export interface IInputProps {
	as?: TInputElement
	value?: string | number
	type?: string
	placeholder?: string
	disabled?: boolean
}
