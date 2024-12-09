import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DeviceDetails from './DeviceDetails.tsx'
import Login from './Login.tsx'
import Signup from './Signup.tsx'
import PrivateRoute from './PrivateRoute.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<App />} />
          <Route path="/device/:id" element={<DeviceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
