import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '~/api/services'
import { DEFAULT_ERROR_MESSAGE } from '~/domain/tasks/data'
import type { TTaskResponse } from '~/domain/tasks/types'

interface IRequestError extends Error {
  body?: { detail?: string }
}

export const useTasksStore = defineStore('tasks', () => {
  const items = ref<TTaskResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load(goalId: string | null = null) {
    loading.value = true
    error.value = null
    try {
      items.value = await api.tasks.fetchTasks(goalId)
    } catch (e) {
      const err = e as IRequestError
      error.value = err.body?.detail ?? err.message ?? DEFAULT_ERROR_MESSAGE
      items.value = []
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, load }
})
