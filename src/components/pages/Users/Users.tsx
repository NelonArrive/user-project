import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { fetchUsersAsync } from '../../../store/usersSlice'
import CreateUserForm from '../../ui/CreateUserForm/CreateUserForm'
import UserItem from './user-item/UserItem'
import styles from './Users.module.css'

const Users: FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { users, status, error } = useSelector(
		(state: RootState) => state.users
	)

	useEffect(() => {
		dispatch(fetchUsersAsync())
	}, [])

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'failed') return <div>Error: {error}</div>

	return (
		<div className={styles.users}>
			<CreateUserForm />
			<ul>
				{users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</ul>
		</div>
	)
}

export default Users
