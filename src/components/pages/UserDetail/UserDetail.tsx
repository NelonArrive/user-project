import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../store'
import { getUserByIdAsync } from '../../../store/usersSlice'

const UserDetail: FC = () => {
	const { id } = useParams()
	const dispatch = useDispatch<AppDispatch>()
	const { users } = useSelector((state: RootState) => state.users)

	useEffect(() => {
		if (id) {
			dispatch(getUserByIdAsync(id))
		}
		return
	}, [id, dispatch])

	if (!users.length) {
		return <div>Not Found users!</div>
	}

	const user = users[0]

	return (
		<div>
			<h2>User Detail</h2>
			<div>ID: {user.id}</div>
			<div>First Name: {user.firstName}</div>
			<div>Last Name: {user.lastName}</div>
			<div>Project ID: {user.projectId}</div>
			<div>Disabled: {user.disabled}</div>
		</div>
	)
}

export default UserDetail
