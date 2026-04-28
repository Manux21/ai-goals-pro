export type TIconButtonVariant = "dark" | "lilac"

export interface IIconButtonProps {
	ariaLabel: string
	variant?: TIconButtonVariant
	disabled?: boolean
	type?: "button" | "submit" | "reset"
}
