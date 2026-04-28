import { defineComponent, type PropType } from "vue"
import type { IBadgeProps, TBadgeVariant } from "./Badge.types"
import s from "./Badge.module.css"

export const Badge = defineComponent({
	name: "Badge",
	props: {
		variant: {
			type: String as PropType<TBadgeVariant>,
			default: "default",
		},
	},
	setup(props: IBadgeProps, { attrs, slots }) {
		return () => {
			const classes = [s.badge]

			if (props.variant === "selected") {
				classes.push(s.selected)
			}

			if (props.variant === "success") {
				classes.push(s.success)
			}

			if (props.variant === "warning") {
				classes.push(s.warning)
			}

			if (props.variant === "error") {
				classes.push(s.error)
			}

			if (props.variant === "mandatory") {
				classes.push(s.mandatory)
			}

			if (props.variant === "completed") {
				classes.push(s.completed)
			}

			if (attrs.class) {
				classes.push(String(attrs.class))
			}

			return (
				<span {...attrs} class={classes}>
					{slots.default?.()}
				</span>
			)
		}
	},
})
