import { ChangeEvent, FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../../redux/store'
import {
	User,
	deleteUserAsync,
	editUserAsync,
} from '../../../../redux/user/userSlice'
import styles from './CardItem.module.css'

interface ICardItem {
	user: User
}

const CardItem: FC<ICardItem> = ({ user }) => {
	const dispatch = useDispatch<AppDispatch>()
	const [editing, setEditing] = useState(false)

	const devices = useSelector((state: RootState) => state.devices.items)
	const projects = useSelector((state: RootState) => state.projects)

	const [editedUser, setEditedUser] = useState({ ...projects, ...user })

	const editedProjectsName = editedUser.items.map(p => p.title)
	console.log('editedProjectsName', editedProjectsName)
	console.log('editedUser.items', editedUser.items)

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
					projectName: editedProjectsName,
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
						className={styles.input}
						type='text'
						name='lastName'
						value={editedUser.lastName}
						onChange={handleChange}
					/>
					<input
						className={styles.input}
						type='text'
						name='projectName'
						value={editedUser.projectName}
						onChange={handleChange}
					/>
					<button onClick={() => handleSubmit(user.id)}>Save</button>
					<button className={styles.ml} onClick={() => setEditing(false)}>
						Cancel
					</button>
				</>
			) : (
				<>
					<div className={styles.icon}>
						<img className={styles.img} src='./kid.png' alt='kid' />
						<div className={styles.info}>
							<div>{user.firstName}</div>
							<div>{user.lastName}</div>
						</div>
					</div>

					<div>
						<Link className={styles.link} to={`/card/${user.id}`}>
							Read more
						</Link>
					</div>

					<button onClick={handleEdit}>Edit</button>
					<button
						className={styles.ml}
						onClick={() => handleDeleteUser(user.id)}
					>
						Delete
					</button>
				</>
			)}
		</li>
	)
}

export default CardItem
