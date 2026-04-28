import { ref } from "vue"
import { DEBUG_ROUTE_PATH, HOME_ROUTE_PATH } from "~/app/router.constants"

export type TRouteId = "home" | "debug"

export interface IAppRoute {
	id: TRouteId
	path: string
	hash: string
}

function resolvePath(path: string): string {
	if (path === DEBUG_ROUTE_PATH) {
		return DEBUG_ROUTE_PATH
	}

	return HOME_ROUTE_PATH
}

function resolveRoute(pathname: string, hash: string): IAppRoute {
	const path = resolvePath(pathname)

	if (path === DEBUG_ROUTE_PATH) {
		return {
			id: "debug",
			path,
			hash,
		}
	}

	return {
		id: "home",
		path,
		hash,
	}
}

const route = ref<IAppRoute>(
	resolveRoute(window.location.pathname, window.location.hash),
)

function syncRoute() {
	route.value = resolveRoute(window.location.pathname, window.location.hash)
}

function scrollToHash(hash: string) {
	if (!hash) {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
		return
	}

	const targetId = decodeURIComponent(hash.slice(1))
	const target = document.getElementById(targetId)
	if (!target) {
		return
	}

	target.scrollIntoView({
		behavior: "smooth",
		block: "start",
	})
}

let isRouterStarted = false

export function startRouter() {
	if (isRouterStarted) {
		return
	}

	isRouterStarted = true
	window.addEventListener("popstate", syncRoute)
	window.addEventListener("hashchange", syncRoute)
}

export function useAppRoute() {
	return route
}

export function navigateTo(path: string, hash = "") {
	const targetPath = resolvePath(path)

	if (
		window.location.pathname === targetPath &&
		window.location.hash === hash
	) {
		return
	}

	const targetUrl = `${targetPath}${hash}`
	window.history.pushState({}, "", targetUrl)
	syncRoute()
	requestAnimationFrame(() => {
		scrollToHash(hash)
	})
}

export function navigateToHref(href: string) {
	const url = new URL(href, window.location.origin)
	navigateTo(url.pathname, url.hash)
}
