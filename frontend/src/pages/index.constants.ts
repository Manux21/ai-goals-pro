export const MAX_GOAL_NAME_LENGTH = 120
export const DEFAULT_GOAL_PRIORITY = 3
export const ONBOARDING_USER_ID_STORAGE_KEY = "onboarding_user_id"
export const ONBOARDING_COMPLETED_STORAGE_KEY = "onboarding_completed"
export const ONBOARDING_STEPS_TOTAL = 4
export const SUMMARY_STEP_PROGRESS = 100
export const DECOMPOSITION_PROGRESS_LIMIT = 94
export const DECOMPOSITION_PROGRESS_STEP = 8
export const DECOMPOSITION_PROGRESS_INTERVAL_MS = 260
export const AI_TASK_GENERATION_INITIAL_DELAY_MS = 1000
export const AI_TASK_GENERATION_ITEM_DELAY_MS = 520
export const AI_TASK_GENERATION_COMPLETE_DELAY_MS = 1000
export const ONBOARDING_PROGRESS_BY_STEP = {
	welcome: 25,
	goals: 50,
	decomposing: 75,
	summary: 100,
} as const

export const GOAL_PRIORITY_LABELS = {
	high: "Высокий",
	medium: "Средний",
	low: "Низкий",
}

export const GOAL_PRIORITY_VALUES = {
	high: 5,
	medium: 3,
	low: 1,
}

export const GOAL_TASK_TEMPLATES = [
	["Исследовать рынок", "Собрать MVP", "Подготовить лендинг"],
	["Повторить алгоритмы", "Обновить резюме", "Пробное интервью"],
	["30 мин в день", "Словарь", "Практика речи"],
]

export const GOAL_DEADLINES = ["2025-06-30", "2025-07-20", "2025-08-31"]
export const GOAL_DEADLINE_LABELS = ["30 июн. 2025", "20 июл. 2025", "31 авг. 2025"]
export const GOAL_PRIORITIES = ["high", "medium", "low"] as const
export const GOAL_ICONS = ["target", "briefcase", "book"] as const
