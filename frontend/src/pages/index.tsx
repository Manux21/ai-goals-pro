import { Transition, TransitionGroup, defineComponent, onBeforeUnmount, onMounted, ref } from "vue"
import { DEBUG_ROUTE_PATH } from "~/app/router.constants"
import { navigateTo } from "~/app/router"
import { api } from "~/api/services"
import { GoalType } from "~/api/generated"
import { AnimatedBackground, Button, Card, Input, Notification, Progress } from "~/shared/ui"
import { BookIcon, BriefcaseIcon, CalendarIcon, CheckIcon, GoalIcon } from "~/shared/icons"
import {
	AI_TASK_GENERATION_INITIAL_DELAY_MS,
	AI_TASK_GENERATION_ITEM_DELAY_MS,
	AI_TASK_GENERATION_COMPLETE_DELAY_MS,
	DECOMPOSITION_PROGRESS_INTERVAL_MS,
	DECOMPOSITION_PROGRESS_LIMIT,
	DECOMPOSITION_PROGRESS_STEP,
	GOAL_DEADLINE_LABELS,
	GOAL_DEADLINES,
	GOAL_ICONS,
	MAX_GOAL_NAME_LENGTH,
	ONBOARDING_COMPLETED_STORAGE_KEY,
	ONBOARDING_PROGRESS_BY_STEP,
	ONBOARDING_STEPS_TOTAL,
	ONBOARDING_USER_ID_STORAGE_KEY,
	SUMMARY_STEP_PROGRESS,
	GOAL_PRIORITIES,
	GOAL_PRIORITY_LABELS,
	GOAL_PRIORITY_VALUES,
	GOAL_TASK_TEMPLATES,
} from "~/pages/index.constants"
import type { TGoalDraft, TGoalIcon, TOnboardingStep, TRequestError } from "~/pages/index.types"
import onboardingBackgroundVideo from "~/assets/video/onboarding-background.mp4"
import s from "./index.module.css"

export default defineComponent({
	name: "HomeOnboardingPage",
	setup() {
		const currentStep = ref<TOnboardingStep>("welcome")
		const userId = ref("")
		const goals = ref<TGoalDraft[]>([])
		const submitting = ref(false)
		const resolvingUser = ref(false)
		const decomposing = ref(false)
		const decompositionProgress = ref(0)
		const error = ref<string | null>(null)
		let decompositionTimer: number | null = null

		function getStepIndex() {
			if (currentStep.value === "welcome") {
				return 1
			}

			if (currentStep.value === "goals") {
				return 2
			}

			if (currentStep.value === "decomposing") {
				return 3
			}

			return 4
		}

		function getProgressValue() {
			return ONBOARDING_PROGRESS_BY_STEP[currentStep.value]
		}

		function getProgressLabel() {
			return `Шаг ${getStepIndex()} из ${ONBOARDING_STEPS_TOTAL}`
		}

		function normalizeGoalName(name: string): string {
			return name.trim().toLocaleLowerCase()
		}

		function createGoalDraft(name: string): TGoalDraft {
			const goalIndex = goals.value.length
			const priority = GOAL_PRIORITIES[goalIndex % GOAL_PRIORITIES.length]
			const icon = GOAL_ICONS[goalIndex % GOAL_ICONS.length]
			const deadline = GOAL_DEADLINES[goalIndex % GOAL_DEADLINES.length]
			const deadlineLabel = GOAL_DEADLINE_LABELS[goalIndex % GOAL_DEADLINE_LABELS.length]

			return {
				id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
				name: name.trim(),
				tasks: [],
				priority,
				deadline,
				deadlineLabel,
				icon,
			}
		}

		function addGoalCard() {
			goals.value.push(createGoalDraft(""))
			error.value = null
		}

		function removeGoal(id: string) {
			goals.value = goals.value.filter((goal) => {
				if (goal.id !== id) {
					return true
				}

				return false
			})
		}

		function updateGoalName(id: string, name: string) {
			const trimmedName = name.trimStart()
			goals.value = goals.value.map((goal) => {
				if (goal.id === id) {
					return {
						...goal,
						name: trimmedName,
					}
				}

				return goal
			})
		}

		function validateGoalsStep(): string | null {
			if (!userId.value.trim()) {
				return "Не удалось определить пользователя автоматически"
			}

			if (goals.value.length === 0) {
				return "Добавьте хотя бы одну цель"
			}

			const normalizedNames = new Set<string>()
			for (const goal of goals.value) {
				const name = goal.name.trim()

				if (!name) {
					return "У всех целей должно быть название"
				}

				if (name.length > MAX_GOAL_NAME_LENGTH) {
					return `Название цели не должно быть длиннее ${MAX_GOAL_NAME_LENGTH} символов`
				}

				const normalizedName = normalizeGoalName(name)
				if (normalizedNames.has(normalizedName)) {
					return "Уберите дублирующиеся цели"
				}

				normalizedNames.add(normalizedName)
			}

			return null
		}

		function goToGoalsStep() {
			error.value = null
			currentStep.value = "goals"
		}

		function createTaskId(goalId: string, taskIndex: number) {
			return `${goalId}-task-${taskIndex}-${Math.random().toString(16).slice(2)}`
		}

		function wait(ms: number) {
			return new Promise<void>((resolve) => {
				window.setTimeout(resolve, ms)
			})
		}

		function stopDecompositionProgress() {
			if (decompositionTimer === null) {
				return
			}

			window.clearInterval(decompositionTimer)
			decompositionTimer = null
		}

		function startDecompositionProgress() {
			stopDecompositionProgress()
			decompositionProgress.value = 12
			decompositionTimer = window.setInterval(() => {
				if (decompositionProgress.value >= DECOMPOSITION_PROGRESS_LIMIT) {
					return
				}

				decompositionProgress.value += DECOMPOSITION_PROGRESS_STEP
			}, DECOMPOSITION_PROGRESS_INTERVAL_MS)
		}

		async function generateTasksWithAi(goalDrafts: TGoalDraft[]) {
			const generatedGoals: TGoalDraft[] = goalDrafts.map((goal) => {
				return {
					...goal,
					tasks: [],
				}
			})

			goals.value = generatedGoals
			await wait(AI_TASK_GENERATION_INITIAL_DELAY_MS)

			for (let goalIndex = 0; goalIndex < generatedGoals.length; goalIndex += 1) {
				const templates = GOAL_TASK_TEMPLATES[goalIndex % GOAL_TASK_TEMPLATES.length]

				for (let taskIndex = 0; taskIndex < templates.length; taskIndex += 1) {
					await wait(AI_TASK_GENERATION_ITEM_DELAY_MS)

					const currentGoal = generatedGoals[goalIndex]
					const taskName = templates[taskIndex]
					generatedGoals[goalIndex] = {
						...currentGoal,
						tasks: [
							...currentGoal.tasks,
							{
								id: createTaskId(currentGoal.id, taskIndex),
								name: taskName,
								estimatedHours: taskIndex + 1,
							},
						],
					}

					goals.value = generatedGoals.map((goal) => {
						return {
							...goal,
							tasks: [...goal.tasks],
						}
					})
				}
			}

			return generatedGoals
		}

		async function startTaskDecomposition() {
			const validationError = validateGoalsStep()
			if (validationError) {
				error.value = validationError
				return
			}

			error.value = null
			decomposing.value = true
			currentStep.value = "decomposing"
			startDecompositionProgress()

			try {
				goals.value = await generateTasksWithAi(goals.value)
				decompositionProgress.value = SUMMARY_STEP_PROGRESS
				await wait(AI_TASK_GENERATION_COMPLETE_DELAY_MS)
				currentStep.value = "summary"
			} catch (e) {
				const err = e as TRequestError
				if (err.message) {
					error.value = err.message
				} else {
					error.value = "Не удалось разбить цели на задачи"
				}

				currentStep.value = "goals"
			} finally {
				decomposing.value = false
				stopDecompositionProgress()
			}
		}

		async function submitGoals() {
			const validationError = validateGoalsStep()
			if (validationError) {
				error.value = validationError
				return
			}

			submitting.value = true
			error.value = null

			try {
				for (const goal of goals.value) {
					const createdGoal = await api.goals.createGoal({
						name: goal.name.trim(),
						goal_type: GoalType.Learning,
						priority: GOAL_PRIORITY_VALUES[goal.priority],
						user_id: userId.value.trim(),
						deadline: goal.deadline,
						target_hours_per_week: null,
					})

					for (const task of goal.tasks) {
						await api.tasks.createTask({
							name: task.name,
							estimated_hours: task.estimatedHours,
							deadline: null,
							goal_id: createdGoal.id,
						})
					}
				}

				localStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, "true")
				goals.value = []
				navigateTo(DEBUG_ROUTE_PATH)
			} catch (e) {
				const err = e as TRequestError
				if (err.body && typeof err.body.detail === "string") {
					error.value = err.body.detail
				} else if (err.message) {
					error.value = err.message
				} else {
					error.value = "Не удалось сохранить цели"
				}
			} finally {
				submitting.value = false
			}
		}

		function restartOnboarding() {
			currentStep.value = "welcome"
			goals.value = []
			error.value = null
			decompositionProgress.value = 0
			stopDecompositionProgress()
		}

		function backToGoals() {
			currentStep.value = "goals"
			error.value = null
			stopDecompositionProgress()
		}

		async function resolveUserId() {
			resolvingUser.value = true
			error.value = null

			try {
				const storedUserId = localStorage.getItem(ONBOARDING_USER_ID_STORAGE_KEY)
				if (storedUserId) {
					userId.value = storedUserId
					return
				}

				const users = await api.users.fetchUsers()
				if (users.length === 0) {
					error.value =
						"Пользователь не найден. Сначала создай пользователя в debug-разделе API."
					return
				}

				const firstUser = users[0]
				userId.value = firstUser.id
				localStorage.setItem(ONBOARDING_USER_ID_STORAGE_KEY, firstUser.id)
			} catch (e) {
				const err = e as TRequestError
				if (err.message) {
					error.value = err.message
				} else {
					error.value = "Не удалось получить пользователя для онбординга"
				}
			} finally {
				resolvingUser.value = false
			}
		}

		onMounted(() => {
			const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_STORAGE_KEY)
			if (onboardingCompleted === "true") {
				navigateTo(DEBUG_ROUTE_PATH)
				return
			}

			resolveUserId()
		})

		onBeforeUnmount(() => {
			stopDecompositionProgress()
		})

		function getGoalIcon(icon: TGoalIcon) {
			if (icon === "briefcase") {
				return <BriefcaseIcon />
			}

			if (icon === "book") {
				return <BookIcon />
			}

			return <GoalIcon />
		}

		function getTaskPills(goal: TGoalDraft) {
			if (goal.tasks.length === 0) {
				return null
			}

			return (
				<TransitionGroup
					tag="div"
					class={s.taskPills}
					enterActiveClass={s.listEnterActive}
					enterFromClass={s.listEnterFrom}
					enterToClass={s.listEnterTo}
					leaveActiveClass={s.listLeaveActive}
					leaveFromClass={s.listLeaveFrom}
					leaveToClass={s.listLeaveTo}
					moveClass={s.listMove}
				>
					{goal.tasks.map((task) => (
						<span class={[s.taskPill, s.generatedItem]} key={task.id}>
							<CheckIcon />
							{task.name}
						</span>
					))}
				</TransitionGroup>
			)
		}

		function getGoalCards() {
			return (
				<TransitionGroup
					tag="div"
					class={s.goalBoard}
					enterActiveClass={s.listEnterActive}
					enterFromClass={s.listEnterFrom}
					enterToClass={s.listEnterTo}
					leaveActiveClass={s.listLeaveActive}
					leaveFromClass={s.listLeaveFrom}
					leaveToClass={s.listLeaveTo}
					moveClass={s.listMove}
				>
					{goals.value.map((goal) => (
						<Card
							variant="elevated"
							class={`${s.goalDraftCard} ${s.staggerItem}`}
							key={goal.id}
						>
							<div class={s.goalDraftHeader}>
								<span class={s.goalIcon}>{getGoalIcon(goal.icon)}</span>
								<Button
									type="button"
									variant="ghost"
									onClick={() => {
										removeGoal(goal.id)
									}}
								>
									Удалить
								</Button>
							</div>
							<label class={s.goalDraftField}>
								<span>Новая цель</span>
								<Input
									value={goal.name}
									placeholder="Например: Запустить личный проект"
									autofocus
									onInput={(e: Event) => {
										updateGoalName(goal.id, (e.target as HTMLInputElement).value)
									}}
									onKeydown={(e: KeyboardEvent) => {
										if (e.key === "Enter") {
											e.preventDefault()
											startTaskDecomposition()
										}
									}}
								/>
							</label>
						</Card>
					))}
					<Card class={`${s.addCard} ${s.staggerItem}`} key="add-goal-card">
						<button
							class={s.addGoalButton}
							type="button"
							aria-label="Добавить цель"
							onClick={addGoalCard}
						>
							<span class={s.plusMark} aria-hidden="true">
								<span class={s.plusLine} />
								<span class={`${s.plusLine} ${s.plusLineVertical}`} />
							</span>
							<span>Добавить цель</span>
						</button>
					</Card>
				</TransitionGroup>
			)
		}

		function getAnimatedTitle(text: string) {
			return (
				<span class={s.titleText}>
					{text.split(" ").map((word) => (
						<span class={s.titleWord} key={word}>
							{word}
						</span>
					))}
				</span>
			)
		}

		function getTotalTasksCount() {
			return goals.value.reduce((total, goal) => total + goal.tasks.length, 0)
		}

		function getGoalTasksLabel(goal: TGoalDraft) {
			if (goal.tasks.length === 1) {
				return "1 задача"
			}

			if (goal.tasks.length > 1 && goal.tasks.length < 5) {
				return `${goal.tasks.length} задачи`
			}

			return `${goal.tasks.length} задач`
		}

		function getDecompositionCards() {
			return (
				<div class={s.aiCards}>
					{goals.value.map((goal) => (
						<Card class={`${s.aiCard} ${s.staggerItem}`} key={goal.id}>
							<div class={s.goalPreviewHeader}>
								<span class={s.goalIcon}>{getGoalIcon(goal.icon)}</span>
								<div class={s.goalPreviewText}>
									<h2>{goal.name}</h2>
									<span class={s.aiStatus}>
										<span />
										Генерируем...
									</span>
								</div>
							</div>
							{getTaskPills(goal)}
							<Progress value={decompositionProgress.value} label="" />
						</Card>
					))}
				</div>
			)
		}

		function getSummaryRows() {
			return (
				<div class={s.summaryTable}>
					<div class={s.summaryHead}>
						<span>Цель</span>
						<span>Приоритет</span>
						<span>Дедлайн</span>
					</div>
					{goals.value.map((goal) => (
						<div class={[s.summaryRow, s.staggerItem]} key={goal.id}>
							<div class={s.summaryGoal}>
								<span class={s.goalIcon}>{getGoalIcon(goal.icon)}</span>
								<div>
									<h2>{goal.name}</h2>
									<p>{getGoalTasksLabel(goal)}</p>
								</div>
							</div>
							<span class={[s.priorityBadge, s[goal.priority]]}>
								{GOAL_PRIORITY_LABELS[goal.priority]}
							</span>
							<span class={s.deadline}>
								<CalendarIcon />
								{goal.deadlineLabel}
							</span>
						</div>
					))}
				</div>
			)
		}

		return () => {
			const progressLabel = getProgressLabel()
			const progressValue = getProgressValue()
			let submitButtonText = "Начать"
			if (submitting.value) {
				submitButtonText = "Сохраняем..."
			}

			let statusContent = null
			if (resolvingUser.value) {
				statusContent = (
					<Notification
						variant="info"
						title="Подключаем профиль"
						description="Определяем пользователя для онбординга"
						key="profile-resolving"
					/>
				)
			}

			let errorContent = null
			if (error.value) {
				errorContent = (
					<Notification
						variant="error"
						title="Нужно проверить данные"
						description={error.value}
						key="onboarding-error"
					/>
				)
			}

			let stepContent = (
				<section key="welcome" class={s.screen} aria-labelledby="welcome-title">
					<div class={s.centerBlock}>
						<h1 class={[s.heroTitle, s.revealHeadline]} id="welcome-title">
							{getAnimatedTitle("Привет, Артём")}
						</h1>
						<p class={[s.heroSubtitle, s.revealSubtitle]}>
							Добро пожаловать в <span>AI Goals Pro</span>
						</p>
						<div class={[s.heroAccent, s.revealPanel]} aria-hidden="true" />
						<Button
							type="button"
							size="lg"
							class={s.heroButton}
							disabled={resolvingUser.value || !userId.value}
							onClick={goToGoalsStep}
						>
							Начать
						</Button>
					</div>
				</section>
			)

			if (currentStep.value === "goals") {
				stepContent = (
					<section key="goals" class={s.screen} aria-labelledby="goals-title">
						<div class={s.goalsBlock}>
							<div class={s.heading}>
								<h1 class={[s.title, s.revealHeadline]} id="goals-title">
									{getAnimatedTitle("Добавление целей")}
								</h1>
								<p class={[s.subtitle, s.revealSubtitle]}>
									Сформулируй свои цели. На следующем этапе мы разложим их на
									понятные задачи.
								</p>
							</div>

							{getGoalCards()}

							<div class={s.actions}>
								<Button type="button" variant="ghost" onClick={restartOnboarding}>
									Назад
								</Button>
								<Button
									type="button"
									disabled={decomposing.value}
									onClick={startTaskDecomposition}
								>
									Разбить на задачи
								</Button>
							</div>
						</div>
					</section>
				)
			}

			if (currentStep.value === "decomposing") {
				stepContent = (
					<section key="decomposing" class={s.screen} aria-labelledby="decomposing-title">
						<div class={s.aiBlock}>
							<div class={s.heading}>
								<h1 class={[s.title, s.revealHeadline]} id="decomposing-title">
									{getAnimatedTitle("Разбиение на задачи")}
								</h1>
								<p class={[s.subtitle, s.revealSubtitle]}>
									AI поможет превратить каждую цель в конкретный план действий.
								</p>
							</div>
							{getDecompositionCards()}
						</div>
					</section>
				)
			}

			if (currentStep.value === "summary") {
				stepContent = (
					<section key="summary" class={s.screen} aria-labelledby="summary-title">
						<div class={s.summaryBlock}>
							<div class={s.heading}>
								<h1 class={[s.title, s.revealHeadline]} id="summary-title">
									{getAnimatedTitle("Твой план готов")}
								</h1>
								<p class={[s.subtitle, s.revealSubtitle]}>Проверь цели и задачи перед стартом.</p>
							</div>
							{getSummaryRows()}
							<div class={s.stats}>
								<div class={s.staggerItem}>
									<span>Всего целей</span>
									<strong>{goals.value.length}</strong>
								</div>
								<div class={s.staggerItem}>
									<span>Всего задач</span>
									<strong>
										{getTotalTasksCount()}
									</strong>
								</div>
								<div class={s.staggerItem}>
									<span>Прогресс</span>
									<strong>0%</strong>
								</div>
							</div>
							<div class={s.actions}>
								<Button type="button" variant="ghost" onClick={backToGoals}>
									Назад
								</Button>
								<Button
									type="button"
									size="lg"
									class={s.startButton}
									disabled={submitting.value}
									onClick={submitGoals}
								>
									{submitButtonText}
								</Button>
							</div>
						</div>
					</section>
				)
			}

			return (
				<div class={s.page} id="home">
					<video
						class={s.videoBackground}
						src={onboardingBackgroundVideo}
						autoplay
						loop
						muted
						playsinline
						aria-hidden="true"
					/>
					<AnimatedBackground />
					<div class={s.content}>
						<TransitionGroup
							tag="div"
							class={s.notificationStack}
							enterActiveClass={s.notificationEnterActive}
							enterFromClass={s.notificationEnterFrom}
							enterToClass={s.notificationEnterTo}
							leaveActiveClass={s.notificationLeaveActive}
							leaveFromClass={s.notificationLeaveFrom}
							leaveToClass={s.notificationLeaveTo}
						>
							{statusContent}
							{errorContent}
						</TransitionGroup>
						<Transition
							mode="out-in"
							enterActiveClass={s.screenEnterActive}
							enterFromClass={s.screenEnterFrom}
							enterToClass={s.screenEnterTo}
							leaveActiveClass={s.screenLeaveActive}
							leaveFromClass={s.screenLeaveFrom}
							leaveToClass={s.screenLeaveTo}
						>
							{stepContent}
						</Transition>
					</div>
					<Card class={s.progressDock}>
						<div class={s.progressMeta}>
							<Transition
								mode="out-in"
								enterActiveClass={s.labelEnterActive}
								enterFromClass={s.labelEnterFrom}
								enterToClass={s.labelEnterTo}
								leaveActiveClass={s.labelLeaveActive}
								leaveFromClass={s.labelLeaveFrom}
								leaveToClass={s.labelLeaveTo}
							>
								<span key={progressLabel}>{progressLabel}</span>
							</Transition>
							<span>{goals.value.length} целей</span>
						</div>
						<Progress value={progressValue} label="" />
					</Card>
				</div>
			)
		}
	},
})
