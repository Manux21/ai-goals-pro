import { defineComponent } from "vue"
import { TaskItem } from "./TaskItem"
import type { TTaskResponse } from "~/domain/tasks/types"
import { Card } from "~/shared/ui"
import type { ITaskListProps } from "./TaskList.types"
import s from "./TaskList.module.css"

export const TaskList = defineComponent({
	name: "TaskList",
	props: {
		items: {
			type: Array as () => TTaskResponse[],
			required: true,
		},
	},
	setup(props: ITaskListProps) {
		return () => {
			let content = props.items.map((task) => <TaskItem key={task.id} task={task} />)

			if (props.items.length === 0) {
				content = [
					<Card tag="li" class={s.empty} key="empty">
						Нет задач
					</Card>,
				]
			}

			return <ul class={s.list}>{content}</ul>
		}
	},
})
