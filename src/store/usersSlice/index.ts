import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	createUser,
	deleteUser,
	editUser,
	fetchUsers,
	getUserById,
} from '../../utils/api'

export const fetchUsersAsync = createAsyncThunk(
	'users/fetchUsers',
	async () => {
		const response = await fetchUsers()
		return response
	}
)

export const getUserByIdAsync = createAsyncThunk(
	'users/getUserById',
	async (userId: string) => {
		const response = await getUserById(userId)
		return response
	}
)

export const createUserAsync = createAsyncThunk(
	'users/createUser',
	async (userData: any) => {
		const response = await createUser(userData)
		return response
	}
)

export const editUserAsync = createAsyncThunk(
	'users/editUser',
	async ({
		userId,
		userData,
	}: {
		userId: number
		userData: IEditUserAsync
	}) => {
		const response = await editUser(userId, userData)
		return response
	}
)

export const deleteUserAsync = createAsyncThunk(
	'users/deleteUser',
	async (userId: number) => {
		await deleteUser(userId)
		return userId
	}
)

export interface User {
	id: number
	projectId: number
	firstName: string
	lastName: string
	disabled: number
}

// TODO: вынести в types
export interface IEditUserAsync {
	firstName: string
	lastName: string
}

interface UsersState {
	users: User[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: UsersState = {
	users: [],
	status: 'idle',
	error: null,
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUsersAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchUsersAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.users = action.payload
			})
			.addCase(fetchUsersAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || null
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.users.push(action.payload)
			})
			.addCase(editUserAsync.fulfilled, (state, action) => {
				const index = state.users.findIndex(
					user => user.id === action.payload.id
				)
				if (index !== -1) {
					state.users[index] = action.payload
				}
			})
			.addCase(deleteUserAsync.fulfilled, (state, action) => {
				state.users = state.users.filter(user => user.id !== action.payload)
			})
			.addCase(getUserByIdAsync.pending, state => {
				state.users = []
			})
			.addCase(getUserByIdAsync.fulfilled, (state, action) => {
				state.users = action.payload
			})
	},
})

export default usersSlice.reducer
