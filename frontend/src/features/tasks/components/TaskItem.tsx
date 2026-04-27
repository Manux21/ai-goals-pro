import { defineComponent } from "vue"
import type { TTaskResponse } from "~/domain/tasks/types"
import s from "./TaskItem.module.css"

interface ITaskItemProps {
	task: TTaskResponse
}

export const TaskItem = defineComponent({
	name: "TaskItem",
	props: {
		task: {
			type: Object as () => TTaskResponse,
			required: true,
		},
	},
	setup(props: ITaskItemProps) {
		return () => (
			<li class={s.item}>
				<span class={s.name}>{props.task.name}</span>
				<span class={s.hours}>{props.task.estimated_hours} ч</span>
				{props.task.deadline && (
					<span class={s.deadline}>{props.task.deadline}</span>
				)}
			</li>
		)
	},
})
