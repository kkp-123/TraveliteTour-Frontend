import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import SignIn from './components/userSigin/SignIn'
import Login from './components/userSigin/Login'
import BookTour from './components/BookTour/BookTour'
import AdminHome from './components/Admin/AdminHome'
import AdminAddTour from './components/Admin/AdminAddTour'
import UserDetails from './components/Admin/AdminUsers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-300'>
   <Header/>
   <UserDetails/>
    </div>
  )
}

export default App
