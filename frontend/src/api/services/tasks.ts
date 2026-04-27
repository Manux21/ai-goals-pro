import { get, post } from '~/api/base/client'
import { TASKS_API_PATH } from '~/domain/tasks/data'
import type { TaskCreate, TaskResponse } from '~/api/generated'

export function fetchTasks(goalId: string | null = null): Promise<TaskResponse[]> {
  const query = goalId ? `?goal_id=${goalId}` : ''
  return get<TaskResponse[]>(`${TASKS_API_PATH}${query}`)
}

export function fetchTask(taskId: string): Promise<TaskResponse> {
  return get<TaskResponse>(`${TASKS_API_PATH}/${taskId}`)
}

export function createTask(data: TaskCreate): Promise<TaskResponse> {
  return post<TaskResponse>(TASKS_API_PATH, data)
}
