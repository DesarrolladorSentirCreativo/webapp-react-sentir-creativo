import './index.css'
import './interceptors'
import 'devextreme/dist/css/dx.material.orange.light.compact.css'
import './assets/css/dx.material.sentir-creativo-orange.css'

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
