export type TCardVariant = "base" | "elevated" | "accent"

export type TCardTag = "div" | "section" | "article" | "li"

export interface ICardProps {
	variant?: TCardVariant
	tag?: TCardTag
}
