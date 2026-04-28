import { defineComponent } from "vue"
import { DEBUG_ROUTE_PATH } from "~/app/router.constants"
import { navigateToHref, useAppRoute } from "~/app/router"
import logoUrl from "~/assets/logo.png"
import { ONBOARDING_COMPLETED_STORAGE_KEY } from "~/pages/index.constants"
import { Badge, IconButton, SidebarItem } from "~/shared/ui"
import {
	BellIcon,
	ChartIcon,
	GoalIcon,
	HomeIcon,
	RestartIcon,
	SearchIcon,
	TaskIcon,
} from "~/shared/icons"
import s from "./default.module.css"

export const DefaultLayout = defineComponent({
	name: "DefaultLayout",
	setup(_, { slots }) {
		const route = useAppRoute()

		function isHomeActive() {
			if (route.value.path !== DEBUG_ROUTE_PATH) {
				return false
			}

			if (!route.value.hash) {
				return true
			}

			if (route.value.hash === "#home") {
				return true
			}

			return false
		}

		function isGoalsActive() {
			if (route.value.path !== DEBUG_ROUTE_PATH) {
				return false
			}

			if (route.value.hash === "#goals") {
				return true
			}

			return false
		}

		function isTasksActive() {
			if (
				route.value.path === DEBUG_ROUTE_PATH &&
				route.value.hash === "#tasks"
			) {
				return true
			}

			return false
		}

		function isAnalyticsActive() {
			if (
				route.value.path === DEBUG_ROUTE_PATH &&
				route.value.hash === "#analytics"
			) {
				return true
			}

			return false
		}

		function createNavigateHandler(href: string) {
			return (event: MouseEvent) => {
				event.preventDefault()
				navigateToHref(href)
			}
		}

		function restartOnboarding() {
			localStorage.removeItem(ONBOARDING_COMPLETED_STORAGE_KEY)
			navigateToHref("/#home")
		}

		return () => (
			<div class={s.shell}>
				<aside class={s.sidebar} aria-label="Основная навигация">
					<div class={s.brand}>
						<span class={s.brandMark}>
							<img src={logoUrl} alt="" class={s.brandLogo} />
						</span>
						<span class={s.brandText}>AI Goals Pro</span>
					</div>

					<nav class={s.nav}>
						<SidebarItem
							label="Home"
							href="/debug#home"
							active={isHomeActive()}
							onClick={createNavigateHandler("/debug#home")}
						>
							<HomeIcon />
						</SidebarItem>
						<SidebarItem
							label="Goals"
							href="/debug#goals"
							active={isGoalsActive()}
							onClick={createNavigateHandler("/debug#goals")}
						>
							<GoalIcon />
						</SidebarItem>
						<SidebarItem
							label="Tasks"
							href="/debug#tasks"
							active={isTasksActive()}
							onClick={createNavigateHandler("/debug#tasks")}
						>
							<TaskIcon />
						</SidebarItem>
						<SidebarItem
							label="Analytics"
							href="/debug#analytics"
							active={isAnalyticsActive()}
							onClick={createNavigateHandler("/debug#analytics")}
						>
							<ChartIcon />
						</SidebarItem>
						<SidebarItem label="Онбординг" onClick={restartOnboarding}>
							<RestartIcon />
						</SidebarItem>
					</nav>

					<div class={s.sidebarCard}>
						<Badge variant="success">Learning Plan</Badge>
						<p>Фокус на целях, прогрессе и следующих действиях.</p>
					</div>
				</aside>

				<div class={s.main}>
					<header class={s.header}>
						<div class={s.search} role="search">
							<SearchIcon />
							<span>Search courses, goals, tasks</span>
						</div>
						<div class={s.headerActions}>
							<IconButton ariaLabel="Открыть уведомления">
								<BellIcon />
							</IconButton>
							<div class={s.profile}>
								<span class={s.avatar}>A</span>
								<div class={s.profileText}>
									<span>Arteme</span>
									<span>Learning designer</span>
								</div>
							</div>
						</div>
					</header>

					<main class={s.content}>{slots.default?.()}</main>
				</div>
			</div>
		)
	},
})
