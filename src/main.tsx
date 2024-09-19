import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DeviceDetails from './DeviceDetails.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/device/:id" element={<DeviceDetails/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
