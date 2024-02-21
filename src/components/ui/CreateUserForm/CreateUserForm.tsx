import { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { createUserAsync } from '../../../store/usersSlice'
import styles from './CreateUserForm.module.css'

const CreateUserForm: FC = () => {
	const [userData, setUserData] = useState({
		id: null,
		projectId: 0,
		firstName: '',
		lastName: '',
		disabled: 0,
	})

	const dispatch = useDispatch<AppDispatch>()
	const users = useSelector((state: RootState) => state.users.users)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Создаем массив, содержащий все значения свойства id для каждого объекта в массиве users
		// Фильтруем массив ids, чтобы удалить все элементы, которые не являются числами
		// Функция isNaN() возвращает true для всех значений, не являющихся числами
		const ids = users.map(user => user.id).filter(id => !isNaN(id))

		// Затем определяется максимальный id среди всех числовых id в массиве ids.
		// Если ids содержит хотя бы один элемент, используется Math.max(...ids),
		// чтобы найти максимальное значение в массиве ids.
		// Если ids пустой, устанавливается значение 0.
		const maxId = ids.length > 0 ? Math.max(...ids) : 0

		console.log(maxId)

		const newUser = {
			...userData,
			id: String(maxId + 1),
		}

		dispatch(createUserAsync(newUser))
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
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

			<div>
				<button className={styles.btn} type='submit'>
					Create User
				</button>
			</div>
		</form>
	)
}

export default CreateUserForm
