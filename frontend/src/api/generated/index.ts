/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ScheduleStatus */
export enum ScheduleStatus {
	Draft = "draft",
	Active = "active",
}

/** GoalType */
export enum GoalType {
	Work = "work",
	Learning = "learning",
	Hobby = "hobby",
}

/** EventType */
export enum EventType {
	Work = "work",
	Learning = "learning",
	Hobby = "hobby",
	Health = "health",
	Social = "social",
	Fixed = "fixed",
}

/** EventCreate */
export interface EventCreate {
	/** Title */
	title: string
	event_type: EventType
	/**
	 * Start At
	 * @format date-time
	 */
	start_at: string
	/**
	 * Duration Minutes
	 * @min 1
	 */
	duration_minutes: number
	/**
	 * Schedule Id
	 * @format uuid
	 */
	schedule_id: string
}

/** EventResponse */
export interface EventResponse {
	/** Title */
	title: string
	event_type: EventType
	/**
	 * Start At
	 * @format date-time
	 */
	start_at: string
	/**
	 * Duration Minutes
	 * @min 1
	 */
	duration_minutes: number
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * Schedule Id
	 * @format uuid
	 */
	schedule_id: string
}

/** GoalCreate */
export interface GoalCreate {
	/** Name */
	name: string
	goal_type: GoalType
	/**
	 * Priority
	 * @min 1
	 * @max 5
	 */
	priority: number
	/** Deadline */
	deadline?: string | null
	/** Target Hours Per Week */
	target_hours_per_week?: number | null
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
}

/** GoalResponse */
export interface GoalResponse {
	/** Name */
	name: string
	goal_type: GoalType
	/**
	 * Priority
	 * @min 1
	 * @max 5
	 */
	priority: number
	/** Deadline */
	deadline?: string | null
	/** Target Hours Per Week */
	target_hours_per_week?: number | null
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[]
}

/** HobbyCreate */
export interface HobbyCreate {
	/** Name */
	name: string
	/**
	 * Hours Per Week
	 * @min 0
	 */
	hours_per_week: number
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
}

/** HobbyResponse */
export interface HobbyResponse {
	/** Name */
	name: string
	/**
	 * Hours Per Week
	 * @min 0
	 */
	hours_per_week: number
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
}

/** ScheduleCreate */
export interface ScheduleCreate {
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
	/**
	 * Start Date
	 * @format date
	 */
	start_date: string
	/**
	 * End Date
	 * @format date
	 */
	end_date: string
}

/** ScheduleGenerate */
export interface ScheduleGenerate {
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
	/**
	 * Start Date
	 * @format date
	 */
	start_date: string
	/**
	 * End Date
	 * @format date
	 */
	end_date: string
}

/** ScheduleResponse */
export interface ScheduleResponse {
	/**
	 * Start Date
	 * @format date
	 */
	start_date: string
	/**
	 * End Date
	 * @format date
	 */
	end_date: string
	/** @default "draft" */
	status?: ScheduleStatus
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
}

/** ScheduleWithEventsResponse */
export interface ScheduleWithEventsResponse {
	/**
	 * Start Date
	 * @format date
	 */
	start_date: string
	/**
	 * End Date
	 * @format date
	 */
	end_date: string
	/** @default "draft" */
	status?: ScheduleStatus
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string
	/**
	 * Events
	 * @default []
	 */
	events?: EventResponse[]
}

/** TaskCreate */
export interface TaskCreate {
	/** Name */
	name: string
	/**
	 * Estimated Hours
	 * @min 0
	 */
	estimated_hours: number
	/** Deadline */
	deadline?: string | null
	/**
	 * Goal Id
	 * @format uuid
	 */
	goal_id: string
}

/** TaskResponse */
export interface TaskResponse {
	/** Name */
	name: string
	/**
	 * Estimated Hours
	 * @min 0
	 */
	estimated_hours: number
	/** Deadline */
	deadline?: string | null
	/**
	 * Id
	 * @format uuid
	 */
	id: string
	/**
	 * Goal Id
	 * @format uuid
	 */
	goal_id: string
}

/** UserCreate */
export interface UserCreate {
	/**
	 * Email
	 * @format email
	 */
	email: string
	/**
	 * Timezone
	 * @default "UTC"
	 */
	timezone?: string
	/**
	 * Work Hours Start
	 * @min 0
	 * @max 23
	 */
	work_hours_start: number
	/**
	 * Work Hours End
	 * @min 0
	 * @max 23
	 */
	work_hours_end: number
	/**
	 * Min Sleep Hours
	 * @min 4
	 * @max 12
	 */
	min_sleep_hours: number
}

/** UserResponse */
export interface UserResponse {
	/**
	 * Email
	 * @format email
	 */
	email: string
	/**
	 * Timezone
	 * @default "UTC"
	 */
	timezone?: string
	/**
	 * Work Hours Start
	 * @min 0
	 * @max 23
	 */
	work_hours_start: number
	/**
	 * Work Hours End
	 * @min 0
	 * @max 23
	 */
	work_hours_end: number
	/**
	 * Min Sleep Hours
	 * @min 4
	 * @max 12
	 */
	min_sleep_hours: number
	/**
	 * Id
	 * @format uuid
	 */
	id: string
}

/** ValidationError */
export interface ValidationError {
	/** Location */
	loc: (string | number)[]
	/** Message */
	msg: string
	/** Error Type */
	type: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">

export interface FullRequestParams extends Omit<RequestInit, "body"> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat
	/** request body */
	body?: unknown
	/** base url */
	baseUrl?: string
	/** request cancellation token */
	cancelToken?: CancelToken
}

export type RequestParams = Omit<
	FullRequestParams,
	"body" | "method" | "query" | "path"
>

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string
	baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<RequestParams | void> | RequestParams | void
	customFetch?: typeof fetch
}

export interface HttpResponse<
	D extends unknown,
	E extends unknown = unknown,
> extends Response {
	data: D
	error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
	Json = "application/json",
	JsonApi = "application/vnd.api+json",
	FormData = "multipart/form-data",
	UrlEncoded = "application/x-www-form-urlencoded",
	Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = ""
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"]
	private abortControllers = new Map<CancelToken, AbortController>()
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams)

	private baseApiParams: RequestParams = {
		credentials: "same-origin",
		headers: {},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	}

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig)
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key)
		return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key])
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key]
		return value.map((v: any) => this.encodeQueryParam(key, v)).join("&")
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {}
		const keys = Object.keys(query).filter(
			(key) => "undefined" !== typeof query[key],
		)
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key),
			)
			.join("&")
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery)
		return queryString ? `?${queryString}` : ""
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		[ContentType.JsonApi]: (input: any) =>
			input !== null && (typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== "string"
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) => {
			if (input instanceof FormData) {
				return input
			}

			return Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key]
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === "object" && property !== null
							? JSON.stringify(property)
							: `${property}`,
				)
				return formData
			}, new FormData())
		},
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	}

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams,
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		}
	}

	protected createAbortSignal = (
		cancelToken: CancelToken,
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken)
			if (abortController) {
				return abortController.signal
			}
			return void 0
		}

		const abortController = new AbortController()
		this.abortControllers.set(cancelToken, abortController)
		return abortController.signal
	}

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken)

		if (abortController) {
			abortController.abort()
			this.abortControllers.delete(cancelToken)
		}
	}

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const queryString = query && this.toQueryString(query)
		const payloadFormatter = this.contentFormatters[type || ContentType.Json]
		const responseFormat = format || requestParams.format

		return this.customFetch(
			`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData
						? { "Content-Type": type }
						: {}),
				},
				signal:
					(cancelToken
						? this.createAbortSignal(cancelToken)
						: requestParams.signal) || null,
				body:
					typeof body === "undefined" || body === null
						? null
						: payloadFormatter(body),
			},
		).then(async (response) => {
			const r = response as HttpResponse<T, E>
			r.data = null as unknown as T
			r.error = null as unknown as E

			const responseToParse = responseFormat ? response.clone() : response
			const data = !responseFormat
				? r
				: await responseToParse[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data
							} else {
								r.error = data
							}
							return r
						})
						.catch((e) => {
							r.error = e
							return r
						})

			if (cancelToken) {
				this.abortControllers.delete(cancelToken)
			}

			if (!response.ok) throw data
			return data
		})
	}
}

/**
 * @title AI Goals Pro
 * @version 0.1.0
 */
export class Api<
	SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @tags users
		 * @name CreateUserApiV1UsersPost
		 * @summary Create User
		 * @request POST:/api/v1/users
		 */
		createUserApiV1UsersPost: (data: UserCreate, params: RequestParams = {}) =>
			this.request<UserResponse, HTTPValidationError>({
				path: `/api/v1/users`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags users
		 * @name GetUserApiV1UsersUserIdGet
		 * @summary Get User
		 * @request GET:/api/v1/users/{user_id}
		 */
		getUserApiV1UsersUserIdGet: (userId: string, params: RequestParams = {}) =>
			this.request<UserResponse, HTTPValidationError>({
				path: `/api/v1/users/${userId}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags goals
		 * @name CreateGoalApiV1GoalsPost
		 * @summary Create Goal
		 * @request POST:/api/v1/goals
		 */
		createGoalApiV1GoalsPost: (data: GoalCreate, params: RequestParams = {}) =>
			this.request<GoalResponse, HTTPValidationError>({
				path: `/api/v1/goals`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags goals
		 * @name ListGoalsApiV1GoalsGet
		 * @summary List Goals
		 * @request GET:/api/v1/goals
		 */
		listGoalsApiV1GoalsGet: (
			query: {
				/**
				 * User Id
				 * @format uuid
				 */
				user_id: string
			},
			params: RequestParams = {},
		) =>
			this.request<GoalResponse[], HTTPValidationError>({
				path: `/api/v1/goals`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags goals
		 * @name GetGoalApiV1GoalsGoalIdGet
		 * @summary Get Goal
		 * @request GET:/api/v1/goals/{goal_id}
		 */
		getGoalApiV1GoalsGoalIdGet: (goalId: string, params: RequestParams = {}) =>
			this.request<GoalResponse, HTTPValidationError>({
				path: `/api/v1/goals/${goalId}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags hobbies
		 * @name CreateHobbyApiV1HobbiesPost
		 * @summary Create Hobby
		 * @request POST:/api/v1/hobbies
		 */
		createHobbyApiV1HobbiesPost: (
			data: HobbyCreate,
			params: RequestParams = {},
		) =>
			this.request<HobbyResponse, HTTPValidationError>({
				path: `/api/v1/hobbies`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags hobbies
		 * @name ListHobbiesApiV1HobbiesGet
		 * @summary List Hobbies
		 * @request GET:/api/v1/hobbies
		 */
		listHobbiesApiV1HobbiesGet: (
			query: {
				/**
				 * User Id
				 * @format uuid
				 */
				user_id: string
			},
			params: RequestParams = {},
		) =>
			this.request<HobbyResponse[], HTTPValidationError>({
				path: `/api/v1/hobbies`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags hobbies
		 * @name GetHobbyApiV1HobbiesHobbyIdGet
		 * @summary Get Hobby
		 * @request GET:/api/v1/hobbies/{hobby_id}
		 */
		getHobbyApiV1HobbiesHobbyIdGet: (
			hobbyId: string,
			params: RequestParams = {},
		) =>
			this.request<HobbyResponse, HTTPValidationError>({
				path: `/api/v1/hobbies/${hobbyId}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name CreateTaskApiV1TasksPost
		 * @summary Create Task
		 * @request POST:/api/v1/tasks
		 */
		createTaskApiV1TasksPost: (data: TaskCreate, params: RequestParams = {}) =>
			this.request<TaskResponse, HTTPValidationError>({
				path: `/api/v1/tasks`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name ListTasksApiV1TasksGet
		 * @summary List Tasks
		 * @request GET:/api/v1/tasks
		 */
		listTasksApiV1TasksGet: (
			query?: {
				/** Goal Id */
				goal_id?: string | null
			},
			params: RequestParams = {},
		) =>
			this.request<TaskResponse[], HTTPValidationError>({
				path: `/api/v1/tasks`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags tasks
		 * @name GetTaskApiV1TasksTaskIdGet
		 * @summary Get Task
		 * @request GET:/api/v1/tasks/{task_id}
		 */
		getTaskApiV1TasksTaskIdGet: (taskId: string, params: RequestParams = {}) =>
			this.request<TaskResponse, HTTPValidationError>({
				path: `/api/v1/tasks/${taskId}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags schedules
		 * @name CreateScheduleApiV1SchedulesPost
		 * @summary Create Schedule
		 * @request POST:/api/v1/schedules
		 */
		createScheduleApiV1SchedulesPost: (
			data: ScheduleCreate,
			params: RequestParams = {},
		) =>
			this.request<ScheduleResponse, HTTPValidationError>({
				path: `/api/v1/schedules`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags schedules
		 * @name ListSchedulesApiV1SchedulesGet
		 * @summary List Schedules
		 * @request GET:/api/v1/schedules
		 */
		listSchedulesApiV1SchedulesGet: (
			query: {
				/**
				 * User Id
				 * @format uuid
				 */
				user_id: string
			},
			params: RequestParams = {},
		) =>
			this.request<ScheduleResponse[], HTTPValidationError>({
				path: `/api/v1/schedules`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags schedules
		 * @name GenerateScheduleApiV1SchedulesGeneratePost
		 * @summary Generate Schedule
		 * @request POST:/api/v1/schedules/generate
		 */
		generateScheduleApiV1SchedulesGeneratePost: (
			data: ScheduleGenerate,
			params: RequestParams = {},
		) =>
			this.request<ScheduleResponse, HTTPValidationError>({
				path: `/api/v1/schedules/generate`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags schedules
		 * @name GetScheduleApiV1SchedulesScheduleIdGet
		 * @summary Get Schedule
		 * @request GET:/api/v1/schedules/{schedule_id}
		 */
		getScheduleApiV1SchedulesScheduleIdGet: (
			scheduleId: string,
			params: RequestParams = {},
		) =>
			this.request<ScheduleWithEventsResponse, HTTPValidationError>({
				path: `/api/v1/schedules/${scheduleId}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags events
		 * @name CreateEventApiV1EventsPost
		 * @summary Create Event
		 * @request POST:/api/v1/events
		 */
		createEventApiV1EventsPost: (
			data: EventCreate,
			params: RequestParams = {},
		) =>
			this.request<EventResponse, HTTPValidationError>({
				path: `/api/v1/events`,
				method: "POST",
				body: data,
				type: ContentType.Json,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags events
		 * @name GetEventApiV1EventsEventIdGet
		 * @summary Get Event
		 * @request GET:/api/v1/events/{event_id}
		 */
		getEventApiV1EventsEventIdGet: (
			eventId: string,
			params: RequestParams = {},
		) =>
			this.request<EventResponse, HTTPValidationError>({
				path: `/api/v1/events/${eventId}`,
				method: "GET",
				format: "json",
				...params,
			}),
	}
	health = {
		/**
		 * No description
		 *
		 * @name HealthHealthGet
		 * @summary Health
		 * @request GET:/health
		 */
		healthHealthGet: (params: RequestParams = {}) =>
			this.request<any, any>({
				path: `/health`,
				method: "GET",
				format: "json",
				...params,
			}),
	}
}
