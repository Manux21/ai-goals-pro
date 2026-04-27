import { defineComponent } from 'vue'
import TasksPage from '~/pages/index'

export default defineComponent({
  name: 'App',
  setup() {
    return () => <TasksPage />
  },
})
