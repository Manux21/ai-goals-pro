import { defineComponent } from "vue"
import type { TTaskResponse } from "~/domain/tasks/types"
import { Badge, Card } from "~/shared/ui"
import type { ITaskItemProps } from "./TaskItem.types"
import s from "./TaskItem.module.css"

export const TaskItem = defineComponent({
	name: "TaskItem",
	props: {
		task: {
			type: Object as () => TTaskResponse,
			required: true,
		},
	},
	setup(props: ITaskItemProps) {
		return () => {
			let deadlineContent = null

			if (props.task.deadline) {
				deadlineContent = <Badge>{props.task.deadline}</Badge>
			}

			return (
				<Card tag="li" class={s.item}>
					<span class={s.name}>{props.task.name}</span>
					<div class={s.meta}>
						<Badge variant="success">{props.task.estimated_hours} ч</Badge>
						{deadlineContent}
					</div>
				</Card>
			)
		}
	},
})
