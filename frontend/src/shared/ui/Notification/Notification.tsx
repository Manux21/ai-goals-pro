import { defineComponent, type PropType } from "vue"
import { BellIcon, CheckIcon } from "~/shared/icons"
import type { INotificationProps, TNotificationVariant } from "./Notification.types"
import s from "./Notification.module.css"

export const Notification = defineComponent({
	name: "Notification",
	props: {
		variant: {
			type: String as PropType<TNotificationVariant>,
			default: "info",
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
	},
	setup(props: INotificationProps) {
		function getIcon() {
			if (props.variant === "success") {
				return <CheckIcon />
			}

			return <BellIcon />
		}

		function getRole() {
			if (props.variant === "error") {
				return "alert"
			}

			return "status"
		}

		return () => {
			const classes = [s.root]
			let descriptionContent = null

			if (props.variant === "success") {
				classes.push(s.success)
			} else if (props.variant === "error") {
				classes.push(s.error)
			} else {
				classes.push(s.info)
			}

			if (props.description) {
				descriptionContent = <p class={s.description}>{props.description}</p>
			}

			return (
				<div class={classes} role={getRole()}>
					<span class={s.icon}>{getIcon()}</span>
					<div class={s.content}>
						<strong class={s.title}>{props.title}</strong>
						{descriptionContent}
					</div>
				</div>
			)
		}
	},
})
