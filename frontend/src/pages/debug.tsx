import { defineComponent, ref } from "vue"
import { useTasksApiStore } from "~/features/tasks"
import { GoalType } from "~/api/generated"
import s from "./debug.module.css"

export default defineComponent({
	name: "ApiDebugPage",
	setup() {
		const apiStore = useTasksApiStore()

		const listTasksGoalId = ref("")
		const getTaskId = ref("")
		const createTaskName = ref("")
		const createTaskHours = ref("0")
		const createTaskDeadline = ref("")
		const createTaskGoalId = ref("")

		const getUserId = ref("")
		const createUserEmail = ref("")
		const createUserTimezone = ref("UTC")
		const createUserWorkStart = ref("9")
		const createUserWorkEnd = ref("18")
		const createUserMinSleep = ref("7")

		const listGoalsUserId = ref("")
		const getGoalId = ref("")
		const createGoalName = ref("")
		const createGoalType = ref<GoalType>(GoalType.Work)
		const createGoalPriority = ref("1")
		const createGoalUserId = ref("")
		const createGoalDeadline = ref("")
		const createGoalHoursPerWeek = ref("")

		const onListTasks = () => apiStore.fetchTasks(listTasksGoalId.value || null)
		const onGetTask = () => apiStore.fetchTask(getTaskId.value)
		const onCreateTask = () =>
			apiStore.createTask({
				name: createTaskName.value,
				estimated_hours: Number(createTaskHours.value) || 0,
				deadline: createTaskDeadline.value || null,
				goal_id: createTaskGoalId.value,
			})
		const onListUsers = () => apiStore.fetchUsers()
		const onGetUser = () => {
			const id = getUserId.value.trim()
			if (!id) {
				return
			}
			apiStore.getUser(id)
		}
		const onCreateUser = () =>
			apiStore.createUser({
				email: createUserEmail.value,
				timezone: createUserTimezone.value || undefined,
				work_hours_start: Number(createUserWorkStart.value) || 0,
				work_hours_end: Number(createUserWorkEnd.value) || 0,
				min_sleep_hours: Number(createUserMinSleep.value) || 7,
			})

		const onListGoals = () => apiStore.fetchGoals(listGoalsUserId.value)
		const onGetGoal = () => apiStore.fetchGoal(getGoalId.value)
		const onCreateGoal = () =>
			apiStore.createGoal({
				name: createGoalName.value,
				goal_type: createGoalType.value,
				priority: Number(createGoalPriority.value) || 1,
				user_id: createGoalUserId.value,
				deadline: createGoalDeadline.value || null,
				target_hours_per_week: createGoalHoursPerWeek.value
					? Number(createGoalHoursPerWeek.value)
					: null,
			})

		return () => (
			<section class={s.apiSection}>
				<h2 class={s.sectionTitle}>Проверка API</h2>
				{apiStore.loading && <p class={s.status}>Запрос...</p>}
				{apiStore.error && <p class={s.error}>{apiStore.error}</p>}
				{apiStore.lastResult != null && (
					<pre class={s.result}>
						{JSON.stringify(apiStore.lastResult, null, 2)}
					</pre>
				)}

				<div class={s.block}>
					<h3 class={s.blockTitle}>Users: список (debug)</h3>
					<button type="button" class={s.btn} onClick={onListUsers}>
						GET /users
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Users: по id</h3>
					<input
						value={getUserId.value}
						onInput={(e: Event) =>
							(getUserId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="user_id"
					/>
					<button type="button" class={s.btn} onClick={onGetUser}>
						GET /users/:id
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Users: создать</h3>
					<input
						value={createUserEmail.value}
						onInput={(e: Event) =>
							(createUserEmail.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="email"
						placeholder="email"
					/>
					<input
						value={createUserTimezone.value}
						onInput={(e: Event) =>
							(createUserTimezone.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="timezone (UTC)"
					/>
					<input
						value={createUserWorkStart.value}
						onInput={(e: Event) =>
							(createUserWorkStart.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="number"
						min="0"
						max="23"
						placeholder="work_hours_start (0-23)"
					/>
					<input
						value={createUserWorkEnd.value}
						onInput={(e: Event) =>
							(createUserWorkEnd.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="number"
						min="0"
						max="23"
						placeholder="work_hours_end (0-23)"
					/>
					<input
						value={createUserMinSleep.value}
						onInput={(e: Event) =>
							(createUserMinSleep.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="number"
						min="4"
						max="12"
						placeholder="min_sleep_hours (4-12)"
					/>
					<button type="button" class={s.btn} onClick={onCreateUser}>
						POST /users
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Tasks: список</h3>
					<input
						value={listTasksGoalId.value}
						onInput={(e: Event) =>
							(listTasksGoalId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="goal_id (необяз.)"
					/>
					<button type="button" class={s.btn} onClick={onListTasks}>
						GET /tasks
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Tasks: по id</h3>
					<input
						value={getTaskId.value}
						onInput={(e: Event) =>
							(getTaskId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="task_id"
					/>
					<button type="button" class={s.btn} onClick={onGetTask}>
						GET /tasks/:id
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Tasks: создать</h3>
					<input
						value={createTaskName.value}
						onInput={(e: Event) =>
							(createTaskName.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="name"
					/>
					<input
						value={createTaskHours.value}
						onInput={(e: Event) =>
							(createTaskHours.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="number"
						placeholder="estimated_hours"
					/>
					<input
						value={createTaskDeadline.value}
						onInput={(e: Event) =>
							(createTaskDeadline.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="deadline"
					/>
					<input
						value={createTaskGoalId.value}
						onInput={(e: Event) =>
							(createTaskGoalId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="goal_id"
					/>
					<button type="button" class={s.btn} onClick={onCreateTask}>
						POST /tasks
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Goals: список</h3>
					<input
						value={listGoalsUserId.value}
						onInput={(e: Event) =>
							(listGoalsUserId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="user_id"
					/>
					<button type="button" class={s.btn} onClick={onListGoals}>
						GET /goals
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Goals: по id</h3>
					<input
						value={getGoalId.value}
						onInput={(e: Event) =>
							(getGoalId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="goal_id"
					/>
					<button type="button" class={s.btn} onClick={onGetGoal}>
						GET /goals/:id
					</button>
				</div>

				<div class={s.block}>
					<h3 class={s.blockTitle}>Goals: создать</h3>
					<input
						value={createGoalName.value}
						onInput={(e: Event) =>
							(createGoalName.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="name"
					/>
					<select
						value={createGoalType.value}
						onChange={(e: Event) =>
							(createGoalType.value = (e.target as HTMLSelectElement)
								.value as GoalType)
						}
						class={s.input}
					>
						<option value={GoalType.Work}>work</option>
						<option value={GoalType.Learning}>learning</option>
						<option value={GoalType.Hobby}>hobby</option>
					</select>
					<input
						value={createGoalPriority.value}
						onInput={(e: Event) =>
							(createGoalPriority.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						type="number"
						min="1"
						max="5"
						placeholder="priority 1-5"
					/>
					<input
						value={createGoalUserId.value}
						onInput={(e: Event) =>
							(createGoalUserId.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="user_id"
					/>
					<input
						value={createGoalDeadline.value}
						onInput={(e: Event) =>
							(createGoalDeadline.value = (e.target as HTMLInputElement).value)
						}
						class={s.input}
						placeholder="deadline"
					/>
					<input
						value={createGoalHoursPerWeek.value}
						onInput={(e: Event) =>
							(createGoalHoursPerWeek.value = (
								e.target as HTMLInputElement
							).value)
						}
						class={s.input}
						type="number"
						placeholder="target_hours_per_week"
					/>
					<button type="button" class={s.btn} onClick={onCreateGoal}>
						POST /goals
					</button>
				</div>
			</section>
		)
	},
})
