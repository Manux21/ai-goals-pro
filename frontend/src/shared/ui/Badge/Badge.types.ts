export type TBadgeVariant =
	| "default"
	| "selected"
	| "success"
	| "warning"
	| "error"
	| "mandatory"
	| "completed"

export interface IBadgeProps {
	variant?: TBadgeVariant
}
