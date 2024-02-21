import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { fetchUsersAsync } from '../../../store/usersSlice'
import CreateUserForm from '../../ui/CreateUserForm/CreateUserForm'
import styles from './Users.module.css'
import UserItem from './user-item/UserItem'

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
		<div>
			<CreateUserForm />
			<ul className={styles.users}>
				{users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</ul>
		</div>
	)
}

export default Users
