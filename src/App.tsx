import './App.css'

import axios from 'axios'
import { loadMessages, locale } from 'devextreme/localization'
import esMessages from 'devextreme/localization/messages/es.json'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { Layout } from './components'
import { NotificationProvider } from './context'
import { Login } from './pages'
import store from './redux/store'
import { routes } from './routes'
import authService from './services/auth.service'

const App: React.FC = () => {
  loadMessages(esMessages)
  locale('es')
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    // si el token esta en el localstorage, se verifica que sea valido y agrega a axios para las peticiones
    if (token != null && !authService.isTokenExpired(token)) {
      setIsAuthenticated(true)
    } else {
      delete axios.defaults.headers.Authorization
      localStorage.removeItem('token')
      setIsAuthenticated(false)
    }
  }, [location])

  return (
    <Provider store={store}>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Route>
        </Routes>
      </NotificationProvider>
    </Provider>
  )
}

export default App
