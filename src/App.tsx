import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'
import UserDetail from './components/pages/UserDetail/UserDetail'
import Users from './components/pages/Users/Users'

function App() {
	return (
		<Routes>
			<Route path='*' element={<Home />} />
			<Route path='/users' element={<Users />} />
			<Route path='/user/:id' element={<UserDetail />} />
		</Routes>
	)
}

export default App
