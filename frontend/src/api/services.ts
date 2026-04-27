import * as goalsService from "./services/goals"
import * as tasksService from "./services/tasks"
import * as usersService from "./services/users"

export const api = {
	goals: goalsService,
	tasks: tasksService,
	users: usersService,
}
