import { defineComponent, type PropType } from "vue"
import type { ICardProps, TCardTag, TCardVariant } from "./Card.types"
import s from "./Card.module.css"

export const Card = defineComponent({
	name: "Card",
	props: {
		variant: {
			type: String as PropType<TCardVariant>,
			default: "base",
		},
		tag: {
			type: String as PropType<TCardTag>,
			default: "div",
		},
	},
	setup(props: ICardProps, { attrs, slots }) {
		return () => {
			const classes = [s.card]

			if (props.variant === "elevated") {
				classes.push(s.elevated)
			}

			if (props.variant === "accent") {
				classes.push(s.accent)
			}

			if (attrs.class) {
				classes.push(String(attrs.class))
			}

			if (props.tag === "section") {
				return (
					<section {...attrs} class={classes}>
						{slots.default?.()}
					</section>
				)
			}

			if (props.tag === "article") {
				return (
					<article {...attrs} class={classes}>
						{slots.default?.()}
					</article>
				)
			}

			if (props.tag === "li") {
				return (
					<li {...attrs} class={classes}>
						{slots.default?.()}
					</li>
				)
			}

			return (
				<div {...attrs} class={classes}>
					{slots.default?.()}
				</div>
			)
		}
	},
})
