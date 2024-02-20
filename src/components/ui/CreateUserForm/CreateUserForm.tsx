import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUserAsync } from '../../../store/usersSlice'
import { AppDispatch } from '../../../store'

const CreateUserForm: FC = () => {
	const [userData, setUserData] = useState({
		id: new Date(),
		projectId: 0,
		firstName: '',
		lastName: '',
		disabled: false,
	})

	const dispatch = useDispatch<AppDispatch>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(createUserAsync(userData))
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
				Project ID:
				<input
					type='number'
					name='projectId'
					value={userData.projectId}
					onChange={handleChange}
				/>
			</div>
			<div>
				First Name:
				<input
					type='text'
					name='firstName'
					value={userData.firstName}
					onChange={handleChange}
				/>
			</div>
			<div>
				Last Name:
				<input
					type='text'
					name='lastName'
					value={userData.lastName}
					onChange={handleChange}
				/>
			</div>
			<button type='submit'>Create User</button>
		</form>
	)
}

export default CreateUserForm
