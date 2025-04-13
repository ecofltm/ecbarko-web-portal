import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/adminDashboard'
import  { Toaster } from 'react-hot-toast';
import SuperAdminLayout from './Layouts/SuperAdmin'
import AdminLaouts from './Layouts/AdminLaouts'
import UserLayout from './Layouts/UserLayout'
// import PbulicLayout from './Layouts/PublicLayouts'
// import PublicLayouts from './Layouts/PublicLayouts'
import { useDispatch,useSelector } from 'react-redux'
import { updateUser } from './redux/AuthSlice'
import Dashboard from './pages/ticketClerks/dashboard'
import Users from './pages/ticketClerks/users'
import EcBarkoCard from './pages/ticketClerks/ecbarko-cards'
import Vehicles from './pages/ticketClerks/vehicles'
import Schedule from './pages/ticketClerks/schedule'
import Settings from './pages/ticketClerks/settings'

import AdminUsers from '../src/pages/admin/adminUsers'
import AdminEcBarkoCard from '../src/pages/admin/adminEcBarkoCard'
import AdminVehicles from '../src/pages/admin/adminVehicles'
import AdminSchedule from '../src/pages/admin/adminSchedule'
import AdminTC from '../src/pages/admin/adminTicketClerk'
import AdminSettings from '../src/pages/admin/adminSettings'

import SuperAdminDashboard from './pages/superAdmin/saDashboard'
import SuperAdminUsers from './pages/superAdmin/saUsers'
import SuperAdminEcBarkoCard from './pages/superAdmin/saEcBarkoCard'
import SuperAdminVehicles from './pages/superAdmin/saVehicles'
import SuperAdminShedule from './pages/superAdmin/saSchedule'
import SuperAdminTicketClerk from './pages/superAdmin/saTicketClerk'
import SuperAdminAdmins from './pages/superAdmin/saAdmins'
import SuperAdminSettings from './pages/superAdmin/saSettings'


export default function App() {
  const user=useSelector((state)=>state.Auth.user)
const disptch=useDispatch()
  useEffect(()=>{
         
        disptch(updateUser())
  },[user])

  return (
    <>
          <BrowserRouter>
          <Toaster/>
            <Routes>
              
              <Route path='/' element={<UserLayout/>} >
              <Route index element={<Dashboard/>}/>
              <Route path='users' element={<Users/>}/>
              <Route path='ecbarko-card' element={<EcBarkoCard/>}/>
              <Route path='vehicles' element={<Vehicles/>}/>
              <Route path='schedule' element={<Schedule/>}/>
              <Route path='settings' element={<Settings/>}/>

              </Route>
              <Route path='/admin' element={<AdminLaouts/>}>
              <Route index element={<AdminDashboard/>}/>
              <Route path='adminUsers' element={<AdminUsers/>}/>
              <Route path='adminEcBarkoCard' element={<AdminEcBarkoCard/>}/>
              <Route path='adminVehicle' element={<AdminVehicles/>}/>
              <Route path='adminSchedule' element={<AdminSchedule/>}/>
              <Route path='adminTicketClerk' element={<AdminTC/>}/>
              <Route path='adminSettings' element={<AdminSettings/>}/>

              </Route>

              <Route path='/super-admin' element={<SuperAdminLayout/>}>
              <Route index element={<SuperAdminDashboard/>}/>
              <Route path='saUsers' element={<SuperAdminUsers/>}/>
              <Route path='saEcBarkoCard' element={<SuperAdminEcBarkoCard/>}/>
              <Route path='saVehicle' element={<SuperAdminVehicles/>}/>
              <Route path='saSchedule' element={<SuperAdminShedule/>}/>
              <Route path='saTicketClerk' element={<SuperAdminTicketClerk/>}/>
              <Route path='saAdmins' element={<SuperAdminAdmins/>}/>
              <Route path='saSettings' element={<SuperAdminSettings/>}/>


              </Route>

              {/* <Route path='/' element={<PublicLayouts/>}> */}
              <Route path='login' element={<Login/>}/>
              {/* <Route path='register' element={<Register/>}/> */}
                   
              {/* </Route> */}
            </Routes>
          </BrowserRouter>

    </>
  )
}