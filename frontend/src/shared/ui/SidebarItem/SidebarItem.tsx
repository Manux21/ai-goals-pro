import { defineComponent } from "vue"
import type { ISidebarItemProps } from "./SidebarItem.types"
import s from "./SidebarItem.module.css"

export const SidebarItem = defineComponent({
	name: "SidebarItem",
	props: {
		label: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
		href: {
			type: String,
			default: "",
		},
	},
	setup(props: ISidebarItemProps, { attrs, slots }) {
		return () => {
			const classes = [s.item]

			if (props.active) {
				classes.push(s.active)
			}

			if (props.href) {
				return (
					<a {...attrs} href={props.href} class={classes}>
						<span class={s.icon}>{slots.default?.()}</span>
						<span>{props.label}</span>
					</a>
				)
			}

			return (
				<button {...attrs} type="button" class={classes}>
					<span class={s.icon}>{slots.default?.()}</span>
					<span>{props.label}</span>
				</button>
			)
		}
	},
})
