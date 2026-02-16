import { defineComponent } from 'vue'
import { TaskItem } from './TaskItem'
import type { TTaskResponse } from '~/domain/tasks/types'
import s from './TaskList.module.css'

interface ITaskListProps {
  items: TTaskResponse[]
}

export const TaskList = defineComponent({
  name: 'TaskList',
  props: {
    items: {
      type: Array as () => TTaskResponse[],
      required: true,
    },
  },
  setup(props: ITaskListProps) {
    return () => (
      <ul class={s.list}>
        {props.items.length === 0 ? (
          <li class={s.empty}>Нет задач</li>
        ) : (
          props.items.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </ul>
    )
  },
})
