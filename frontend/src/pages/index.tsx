import { defineComponent, onMounted, ref } from 'vue'
import type { VNode } from 'vue'
import { DefaultLayout } from '~/layouts/default'
import { useTasksStore, TaskList } from '~/features/tasks'
import ApiDebugPage from '~/pages/debug'
import type { TTabId } from '~/pages/index.types'
import s from './index.module.css'

export default defineComponent({
  name: 'TasksPage',
  setup() {
    const store = useTasksStore()
    const activeTab = ref<TTabId>('tasks')

    onMounted(() => {
      store.load()
    })

    return () => {
      let tasksTabClass = s.tab
      if (activeTab.value === 'tasks') {
        tasksTabClass = s.tabActive
      }

      let debugTabClass = s.tab
      if (activeTab.value === 'debug') {
        debugTabClass = s.tabActive
      }

      let tabPanel: VNode | null = null
      if (activeTab.value === 'tasks') {
        tabPanel = (
          <>
            <h1 class={s.title}>Задачи</h1>
            {store.loading && <p class={s.status}>Загрузка...</p>}
            {store.error && <p class={s.error}>{store.error}</p>}
            {!store.loading && !store.error && <TaskList items={store.items} />}
          </>
        )
      } else {
        tabPanel = <ApiDebugPage />
      }

      return (
        <DefaultLayout>
          <div class={s.page}>
            <div class={s.tabs} role="tablist">
              <button
                type="button"
                class={tasksTabClass}
                role="tab"
                aria-selected={activeTab.value === 'tasks'}
                onClick={() => {
                  activeTab.value = 'tasks'
                }}
              >
                Задачи
              </button>
              <button
                type="button"
                class={debugTabClass}
                role="tab"
                aria-selected={activeTab.value === 'debug'}
                onClick={() => {
                  activeTab.value = 'debug'
                }}
              >
                Проверка API
              </button>
            </div>
            {tabPanel}
          </div>
        </DefaultLayout>
      )
    }
  },
})
