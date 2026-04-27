import { get, post } from '~/api/base/client'
import { USERS_API_PATH } from '~/domain/users/data'
import type { UserCreate, UserResponse } from '~/api/generated'

export function fetchUsers(): Promise<UserResponse[]> {
  return get<UserResponse[]>(USERS_API_PATH)
}

export function createUser(data: UserCreate): Promise<UserResponse> {
  return post<UserResponse>(USERS_API_PATH, data)
}

export function getUser(userId: string): Promise<UserResponse> {
  const id = userId.trim()
  if (!id) {
    return Promise.reject(new Error('user_id обязателен'))
  }
  return get<UserResponse>(`${USERS_API_PATH}/${id}`)
}
