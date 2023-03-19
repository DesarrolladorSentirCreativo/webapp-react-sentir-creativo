import './App.css'

import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { Layout } from './components'
import { NotificationProvider } from './context'
import { Home, Login } from './pages'
import authService from './services/auth.service'

const App: React.FC = () => {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    // si el token esta en el localstorage, se verifica que sea valido y agrega a axios para las peticiones
    if ((token != null) && !(authService.isTokenExpired(token))) {
      setIsAuthenticated(true)
    } else {
      // delete axios.defaults.headers.Authorization;
      // localStorage.removeItem('token');
      setIsAuthenticated(false)
    }
  }, [location])

  return (
        <NotificationProvider>
                <Routes>
                    <Route path='/login'
                           element={
                               isAuthenticated ? <Navigate to='/home' replace /> : <Login />
                           } />
                    <Route
                        path='/'
                        element={isAuthenticated ? <Layout /> : <Navigate to='/login' />}
                    >
                        <Route path='/' element={<Navigate to='/home' />} />
                        <Route path="/home" element={<Home />} />
                    </Route>
                </Routes>
        </NotificationProvider>
  )
}

export default App
