import { defineComponent, type PropType } from "vue"
import type { IButtonProps, TButtonSize, TButtonVariant } from "./Button.types"
import s from "./Button.module.css"

export const Button = defineComponent({
	name: "SkillwayButton",
	props: {
		variant: {
			type: String as PropType<TButtonVariant>,
			default: "primary",
		},
		size: {
			type: String as PropType<TButtonSize>,
			default: "md",
		},
		block: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String as PropType<IButtonProps["type"]>,
			default: "button",
		},
	},
	setup(props: IButtonProps, { attrs, slots }) {
		return () => {
			const classes = [s.button]

			if (props.variant === "primary") {
				classes.push(s.primary)
			} else if (props.variant === "secondary") {
				classes.push(s.secondary)
			} else {
				classes.push(s.ghost)
			}

			if (props.size === "lg") {
				classes.push(s.lg)
			}

			if (props.block) {
				classes.push(s.block)
			}

			if (attrs.class) {
				classes.push(String(attrs.class))
			}

			return (
				<button {...attrs} type={props.type} disabled={props.disabled} class={classes}>
					{slots.default?.()}
				</button>
			)
		}
	},
})
