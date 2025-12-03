import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import SignIn from './components/userSigin/SignIn.jsx'
import Login from './components/userSigin/Login.jsx'
import Layout from './Layout.jsx'
import About from './components/About/About.jsx'
import TourPackages from './components/TourPackages/TourPackages.jsx'
import BookTour from './components/BookTour/BookTour.jsx'
import AdminHome from './components/Admin/AdminHome.jsx'
import AdminAddTour from './components/Admin/AdminAddTour.jsx'
import UserDetails from './components/Admin/AdminUsers.jsx'
import UserBookingDetails from './components/UserBookingDetails/UserBookingDetails.jsx'
import ForgotPassword from './components/userSigin/ForgotPassword.jsx'
import AdminShowAllBooking from './components/Admin/AdminShowAllBooking.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/SignIn' element={<SignIn/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/Package' element={<TourPackages/>}></Route>
      <Route path="/BookTour" element={<BookTour/>}></Route>
      <Route path='/UserBookingDetails' element={<UserBookingDetails/>}></Route>

      <Route path="/admin/adminHome" element={<AdminHome/>}></Route>
    <Route path="/admin/adminAddTour" element={<AdminAddTour/>}></Route>
    <Route path='/admin/userDetails' element={<UserDetails/>}></Route>
    <Route path='/admin/allBooking' element={<AdminShowAllBooking/>}></Route>

    </Route>
    </>
    
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App/> */}
  </StrictMode>,
)
