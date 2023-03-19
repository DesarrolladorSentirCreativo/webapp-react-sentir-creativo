import './index.css'
import './interceptors'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { ThemeConfig } from './config/config.theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeConfig>
            <BrowserRouter>
            <App/>
            </BrowserRouter>
        </ThemeConfig>
    </React.StrictMode>
)
