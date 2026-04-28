import { defineComponent, type PropType } from "vue"
import type { IStatCardProps, TStatCardTone } from "./StatCard.types"
import s from "./StatCard.module.css"

export const StatCard = defineComponent({
	name: "StatCard",
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		meta: {
			type: String,
			default: "",
		},
		tone: {
			type: String as PropType<TStatCardTone>,
			default: "default",
		},
	},
	setup(props: IStatCardProps) {
		return () => {
			const classes = [s.card]
			let metaContent = null

			if (props.tone === "lime") {
				classes.push(s.lime)
			}

			if (props.tone === "lilac") {
				classes.push(s.lilac)
			}

			if (props.meta) {
				metaContent = <p class={s.meta}>{props.meta}</p>
			}

			return (
				<article class={classes}>
					<div class={s.header}>
						<p class={s.label}>{props.label}</p>
						<span class={s.indicator} aria-hidden="true" />
					</div>
					<div>
						<p class={s.value}>{props.value}</p>
						{metaContent}
					</div>
				</article>
			)
		}
	},
})
