import { computed, defineComponent } from "vue"
import { motion } from "motion-v"
import type { IProgressProps } from "./Progress.types"
import s from "./Progress.module.css"

export const Progress = defineComponent({
	name: "SkillwayProgress",
	props: {
		value: {
			type: Number,
			required: true,
		},
		max: {
			type: Number,
			default: 100,
		},
		label: {
			type: String,
			default: "",
		},
	},
	setup(props: IProgressProps, { attrs }) {
		const normalizedValue = computed(() => Math.min(Math.max(props.value, 0), props.max))
		const progressScale = computed(() => normalizedValue.value / props.max)

		return () => {
			let labelContent = null

			if (props.label) {
				labelContent = <p class={s.label}>{props.label}</p>
			}

			return (
				<div {...attrs} class={s.root}>
					{labelContent}
					<div
						class={s.progress}
						role="progressbar"
						aria-valuemin="0"
						aria-valuemax={props.max}
						aria-valuenow={normalizedValue.value}
					>
						<motion.span
							class={s.fill}
							initial={false}
							animate={{ scaleX: progressScale.value }}
							transition={{ duration: 0.64, ease: [0.19, 1, 0.22, 1] }}
						/>
					</div>
				</div>
			)
		}
	},
})
