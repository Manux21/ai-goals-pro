import { defineComponent, ref } from "vue"
import { useTasksApiStore } from "~/features/tasks"
import { GoalType } from "~/api/generated"
import { Badge, Button, Card, Input } from "~/shared/ui"
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
		const onCreateGoal = () => {
			let targetHoursPerWeek = null
			if (createGoalHoursPerWeek.value) {
				targetHoursPerWeek = Number(createGoalHoursPerWeek.value)
			}

			return apiStore.createGoal({
				name: createGoalName.value,
				goal_type: createGoalType.value,
				priority: Number(createGoalPriority.value) || 1,
				user_id: createGoalUserId.value,
				deadline: createGoalDeadline.value || null,
				target_hours_per_week: targetHoursPerWeek,
			})
		}

		return () => {
			let loadingContent = null
			let errorContent = null
			let resultContent = null

			if (apiStore.loading) {
				loadingContent = <Badge variant="selected">Запрос...</Badge>
			}

			if (apiStore.error) {
				errorContent = <Badge variant="error">{apiStore.error}</Badge>
			}

			if (apiStore.lastResult != null) {
				resultContent = (
					<pre class={s.result}>{JSON.stringify(apiStore.lastResult, null, 2)}</pre>
				)
			}

			return (
				<section class={s.apiSection} id="home">
					<h2 class={s.sectionTitle}>Проверка API</h2>
					{loadingContent}
					{errorContent}
					{resultContent}

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Users: список (debug)</h3>
					<Button type="button" variant="secondary" onClick={onListUsers}>
						GET /users
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Users: по id</h3>
					<Input
						value={getUserId.value}
						onInput={(e: Event) =>
							(getUserId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="user_id"
					/>
					<Button type="button" variant="secondary" onClick={onGetUser}>
						GET /users/:id
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Users: создать</h3>
					<Input
						value={createUserEmail.value}
						onInput={(e: Event) =>
							(createUserEmail.value = (e.target as HTMLInputElement).value)
						}
						type="email"
						placeholder="email"
					/>
					<Input
						value={createUserTimezone.value}
						onInput={(e: Event) =>
							(createUserTimezone.value = (e.target as HTMLInputElement).value)
						}
						placeholder="timezone (UTC)"
					/>
					<Input
						value={createUserWorkStart.value}
						onInput={(e: Event) =>
							(createUserWorkStart.value = (e.target as HTMLInputElement).value)
						}
						type="number"
						min="0"
						max="23"
						placeholder="work_hours_start (0-23)"
					/>
					<Input
						value={createUserWorkEnd.value}
						onInput={(e: Event) =>
							(createUserWorkEnd.value = (e.target as HTMLInputElement).value)
						}
						type="number"
						min="0"
						max="23"
						placeholder="work_hours_end (0-23)"
					/>
					<Input
						value={createUserMinSleep.value}
						onInput={(e: Event) =>
							(createUserMinSleep.value = (e.target as HTMLInputElement).value)
						}
						type="number"
						min="4"
						max="12"
						placeholder="min_sleep_hours (4-12)"
					/>
					<Button type="button" onClick={onCreateUser}>
						POST /users
					</Button>
				</Card>

				<div class={s.anchor} id="tasks" />
				<Card class={s.block}>
					<h3 class={s.blockTitle}>Tasks: список</h3>
					<Input
						value={listTasksGoalId.value}
						onInput={(e: Event) =>
							(listTasksGoalId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="goal_id (необяз.)"
					/>
					<Button type="button" variant="secondary" onClick={onListTasks}>
						GET /tasks
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Tasks: по id</h3>
					<Input
						value={getTaskId.value}
						onInput={(e: Event) =>
							(getTaskId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="task_id"
					/>
					<Button type="button" variant="secondary" onClick={onGetTask}>
						GET /tasks/:id
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Tasks: создать</h3>
					<Input
						value={createTaskName.value}
						onInput={(e: Event) =>
							(createTaskName.value = (e.target as HTMLInputElement).value)
						}
						placeholder="name"
					/>
					<Input
						value={createTaskHours.value}
						onInput={(e: Event) =>
							(createTaskHours.value = (e.target as HTMLInputElement).value)
						}
						type="number"
						placeholder="estimated_hours"
					/>
					<Input
						value={createTaskDeadline.value}
						onInput={(e: Event) =>
							(createTaskDeadline.value = (e.target as HTMLInputElement).value)
						}
						placeholder="deadline"
					/>
					<Input
						value={createTaskGoalId.value}
						onInput={(e: Event) =>
							(createTaskGoalId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="goal_id"
					/>
					<Button type="button" onClick={onCreateTask}>
						POST /tasks
					</Button>
				</Card>

				<div class={s.anchor} id="goals" />
				<Card class={s.block}>
					<h3 class={s.blockTitle}>Goals: список</h3>
					<Input
						value={listGoalsUserId.value}
						onInput={(e: Event) =>
							(listGoalsUserId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="user_id"
					/>
					<Button type="button" variant="secondary" onClick={onListGoals}>
						GET /goals
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Goals: по id</h3>
					<Input
						value={getGoalId.value}
						onInput={(e: Event) =>
							(getGoalId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="goal_id"
					/>
					<Button type="button" variant="secondary" onClick={onGetGoal}>
						GET /goals/:id
					</Button>
				</Card>

				<Card class={s.block}>
					<h3 class={s.blockTitle}>Goals: создать</h3>
					<Input
						value={createGoalName.value}
						onInput={(e: Event) =>
							(createGoalName.value = (e.target as HTMLInputElement).value)
						}
						placeholder="name"
					/>
					<Input
						as="select"
						value={createGoalType.value}
						onChange={(e: Event) =>
							(createGoalType.value = (e.target as HTMLSelectElement)
								.value as GoalType)
						}
					>
						<option value={GoalType.Work}>work</option>
						<option value={GoalType.Learning}>learning</option>
						<option value={GoalType.Hobby}>hobby</option>
					</Input>
					<Input
						value={createGoalPriority.value}
						onInput={(e: Event) =>
							(createGoalPriority.value = (e.target as HTMLInputElement).value)
						}
						type="number"
						min="1"
						max="5"
						placeholder="priority 1-5"
					/>
					<Input
						value={createGoalUserId.value}
						onInput={(e: Event) =>
							(createGoalUserId.value = (e.target as HTMLInputElement).value)
						}
						placeholder="user_id"
					/>
					<Input
						value={createGoalDeadline.value}
						onInput={(e: Event) =>
							(createGoalDeadline.value = (e.target as HTMLInputElement).value)
						}
						placeholder="deadline"
					/>
					<Input
						value={createGoalHoursPerWeek.value}
						onInput={(e: Event) =>
							(createGoalHoursPerWeek.value = (
								e.target as HTMLInputElement
							).value)
						}
						type="number"
						placeholder="target_hours_per_week"
					/>
					<Button type="button" onClick={onCreateGoal}>
						POST /goals
					</Button>
				</Card>
				<div class={s.anchor} id="analytics" />
				<Card class={s.block}>
					<h3 class={s.blockTitle}>Analytics</h3>
					<Badge variant="selected">Раздел аналитики готовится</Badge>
				</Card>
				</section>
			)
		}
	},
})
