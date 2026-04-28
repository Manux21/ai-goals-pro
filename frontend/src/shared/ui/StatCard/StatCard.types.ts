export type TStatCardTone = "default" | "lime" | "lilac"

export interface IStatCardProps {
	label: string
	value: string
	meta?: string
	tone?: TStatCardTone
}
