import { defineComponent, type PropType } from "vue"
import type {
	IIconButtonProps,
	TIconButtonVariant,
} from "./IconButton.types"
import s from "./IconButton.module.css"

export const IconButton = defineComponent({
	name: "IconButton",
	props: {
		ariaLabel: {
			type: String,
			required: true,
		},
		variant: {
			type: String as PropType<TIconButtonVariant>,
			default: "dark",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String as PropType<IIconButtonProps["type"]>,
			default: "button",
		},
	},
	setup(props: IIconButtonProps, { attrs, slots }) {
		return () => {
			const classes = [s.button]

			if (props.variant === "lilac") {
				classes.push(s.lilac)
			}

			if (attrs.class) {
				classes.push(String(attrs.class))
			}

			return (
				<button
					{...attrs}
					type={props.type}
					aria-label={props.ariaLabel}
					disabled={props.disabled}
					class={classes}
				>
					{slots.default?.()}
				</button>
			)
		}
	},
})
