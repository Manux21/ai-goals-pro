import { ref } from "vue"
import { defineStore } from "pinia"
import { api } from "~/api/services"
import type { GoalCreate, TaskCreate, UserCreate } from "~/api/generated"

interface IRequestError extends Error {
	body?: { detail?: string | unknown }
}

export const useTasksApiStore = defineStore("tasks-api", () => {
	const loading = ref(false)
	const error = ref<string | null>(null)
	const lastResult = ref<unknown>(null)

	function clearError() {
		error.value = null
	}

	function setResult(data: unknown) {
		lastResult.value = data
	}

	async function fetchTasks(goalId: string | null = null) {
		loading.value = true
		error.value = null
		try {
			const data = await api.tasks.fetchTasks(goalId)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function fetchTask(taskId: string) {
		loading.value = true
		error.value = null
		try {
			const data = await api.tasks.fetchTask(taskId)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function createTask(payload: TaskCreate) {
		loading.value = true
		error.value = null
		try {
			const data = await api.tasks.createTask(payload)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function fetchGoals(userId: string) {
		loading.value = true
		error.value = null
		try {
			const data = await api.goals.fetchGoals(userId)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function fetchGoal(goalId: string) {
		loading.value = true
		error.value = null
		try {
			const data = await api.goals.fetchGoal(goalId)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function createGoal(payload: GoalCreate) {
		loading.value = true
		error.value = null
		try {
			const data = await api.goals.createGoal(payload)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function createUser(payload: UserCreate) {
		loading.value = true
		error.value = null
		try {
			const data = await api.users.createUser(payload)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function fetchUsers() {
		loading.value = true
		error.value = null
		try {
			const data = await api.users.fetchUsers()
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	async function getUser(userId: string) {
		loading.value = true
		error.value = null
		try {
			const data = await api.users.getUser(userId)
			setResult(data)
			return data
		} catch (e) {
			const err = e as IRequestError
			error.value =
				typeof err.body?.detail === "string"
					? err.body.detail
					: (err.message ?? "Ошибка")
			throw e
		} finally {
			loading.value = false
		}
	}

	return {
		loading,
		error,
		lastResult,
		clearError,
		fetchTasks,
		fetchTask,
		createTask,
		fetchGoals,
		fetchGoal,
		createGoal,
		createUser,
		fetchUsers,
		getUser,
	}
})
