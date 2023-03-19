import './App.css'

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { NotificationProvider } from './context'
import { Login } from './pages'

const App: React.FC = () => {
  return (
      <NotificationProvider>
          <Router>
              <Routes>
                  <Route path='/login' element={<Login />} />
              </Routes>
          </Router>
      </NotificationProvider>
  )
}

export default App
