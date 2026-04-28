export type TButtonVariant = "primary" | "secondary" | "ghost"

export type TButtonSize = "md" | "lg"

export interface IButtonProps {
	variant?: TButtonVariant
	size?: TButtonSize
	block?: boolean
	disabled?: boolean
	type?: "button" | "submit" | "reset"
}
