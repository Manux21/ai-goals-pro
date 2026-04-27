const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

interface IRequestError extends Error {
	status?: number
	body?: Record<string, unknown>
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	const url = `${API_BASE_URL}${path}`
	const response = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(options.headers as Record<string, string>),
		},
	})
	if (!response.ok) {
		const error: IRequestError = new Error(response.statusText)
		error.status = response.status
		error.body = await response.json().catch(() => ({}))
		throw error
	}
	return response.json()
}

export function get<T>(path: string): Promise<T> {
	return request<T>(path, { method: "GET" })
}

export function post<T>(path: string, data: unknown): Promise<T> {
	return request<T>(path, { method: "POST", body: JSON.stringify(data) })
}
