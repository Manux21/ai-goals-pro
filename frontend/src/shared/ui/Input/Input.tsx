import { defineComponent, type PropType } from "vue"
import type { IInputProps, TInputElement } from "./Input.types"
import s from "./Input.module.css"

export const Input = defineComponent({
	name: "SkillwayInput",
	props: {
		as: {
			type: String as PropType<TInputElement>,
			default: "input",
		},
		value: {
			type: [String, Number],
			default: "",
		},
		type: {
			type: String,
			default: "text",
		},
		placeholder: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props: IInputProps, { attrs, slots }) {
		return () => {
			const classes = [s.control]

			if (props.as === "textarea") {
				classes.push(s.textarea)
			}

			if (attrs.class) {
				classes.push(String(attrs.class))
			}

			if (props.as === "select") {
				return (
					<select
						{...attrs}
						value={props.value}
						disabled={props.disabled}
						class={classes}
					>
						{slots.default?.()}
					</select>
				)
			}

			if (props.as === "textarea") {
				return (
					<textarea
						{...attrs}
						value={props.value}
						placeholder={props.placeholder}
						disabled={props.disabled}
						class={classes}
					/>
				)
			}

			return (
				<input
					{...attrs}
					value={props.value}
					type={props.type}
					placeholder={props.placeholder}
					disabled={props.disabled}
					class={classes}
				/>
			)
		}
	},
})
