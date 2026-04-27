import { get, post } from "~/api/base/client"
import { GOALS_API_PATH } from "~/domain/goals/data"
import type { GoalCreate, GoalResponse } from "~/api/generated"

export function fetchGoals(userId: string): Promise<GoalResponse[]> {
	return get<GoalResponse[]>(`${GOALS_API_PATH}?user_id=${userId}`)
}

export function fetchGoal(goalId: string): Promise<GoalResponse> {
	return get<GoalResponse>(`${GOALS_API_PATH}/${goalId}`)
}

export function createGoal(data: GoalCreate): Promise<GoalResponse> {
	return post<GoalResponse>(GOALS_API_PATH, data)
}
