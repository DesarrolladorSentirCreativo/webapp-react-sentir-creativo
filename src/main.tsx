import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { ThemeConfig } from './config/config.theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeConfig>
            <App/>
        </ThemeConfig>
    </React.StrictMode>
)
