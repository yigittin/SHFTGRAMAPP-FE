import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import UserProfile from './Pages/UserProfile'
import Search from './Pages/Search'

function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/user/:id' element={<UserProfile/>}></Route>
        </Routes>
    </>
  )
   
}
export default App
