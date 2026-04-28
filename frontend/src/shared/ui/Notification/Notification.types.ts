export type TNotificationVariant = "info" | "success" | "error"

export interface INotificationProps {
	variant?: TNotificationVariant
	title: string
	description?: string
}
