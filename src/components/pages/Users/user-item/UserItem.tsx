import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../../../store'
import {
	User,
	deleteUserAsync,
	editUserAsync,
} from '../../../../store/usersSlice'
import styles from './UserItem.module.css'

interface IUserItem {
	user: User
}

const UserItem: FC<IUserItem> = ({ user }) => {
	const dispatch = useDispatch<AppDispatch>()
	const [editing, setEditing] = useState(false)
	const [editedUser, setEditedUser] = useState({ ...user })

	const handleEdit = () => {
		setEditing(true)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setEditedUser(prevUser => ({
			...prevUser,
			[name]: value,
		}))
	}

	const handleSubmit = (userId: number) => {
		dispatch(
			editUserAsync({
				userId,
				userData: {
					firstName: editedUser.firstName,
					lastName: editedUser.lastName,
				},
			})
		)
		setEditing(false)
	}

	const handleDeleteUser = (userId: number) => {
		dispatch(deleteUserAsync(userId))
	}

	return (
		<li className={styles.item}>
			{editing ? (
				<>
					<input
					className={styles.input}
						type='text'
						name='firstName'
						value={editedUser.firstName}
						onChange={handleChange}
					/>
					<input
						type='text'
						name='lastName'
						value={editedUser.lastName}
						onChange={handleChange}
					/>
					<button onClick={() => handleSubmit(user.id)}>Save</button>
					<button onClick={() => setEditing(false)}>Cancel</button>
				</>
			) : (
				<>
					{user.firstName} {user.lastName}
					<Link to={`/user/${user.id}`}>Read more</Link>
					<button onClick={handleEdit}>Edit</button>
					<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
				</>
			)}
		</li>
	)
}

export default UserItem
