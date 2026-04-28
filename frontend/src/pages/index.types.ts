export type TOnboardingStep = "welcome" | "goals" | "decomposing" | "summary"

export type TGoalPriority = "high" | "medium" | "low"

export type TGoalIcon = "target" | "briefcase" | "book"

export type TGoalTaskDraft = {
	id: string
	name: string
	estimatedHours: number
}

export type TGoalDraft = {
	id: string
	name: string
	tasks: TGoalTaskDraft[]
	priority: TGoalPriority
	deadline: string
	deadlineLabel: string
	icon: TGoalIcon
}

export type TRequestError = Error & {
	body?: { detail?: string | unknown }
}
