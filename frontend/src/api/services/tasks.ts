import { get } from '~/api/base/client'
import { TASKS_API_PATH } from '~/domain/tasks/data'
import type { TTaskResponse } from '~/domain/tasks/types'

export function fetchTasks(goalId: string | null = null): Promise<TTaskResponse[]> {
  const query = goalId ? `?goal_id=${goalId}` : ''
  return get<TTaskResponse[]>(`${TASKS_API_PATH}${query}`)
}
