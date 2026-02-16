import { defineComponent, onMounted } from 'vue'
import { DefaultLayout } from '~/layouts/default'
import { useTasksStore, TaskList } from '~/features/tasks'
import s from './index.module.css'

export default defineComponent({
  name: 'TasksPage',
  setup() {
    const store = useTasksStore()

    onMounted(() => {
      store.load()
    })

    return () => (
      <DefaultLayout>
        <div class={s.page}>
          <h1 class={s.title}>Задачи</h1>
          {store.loading && <p class={s.status}>Загрузка...</p>}
          {store.error && <p class={s.error}>{store.error}</p>}
          {!store.loading && !store.error && <TaskList items={store.items} />}
        </div>
      </DefaultLayout>
    )
  },
})
