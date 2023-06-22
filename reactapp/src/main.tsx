import React from 'react'
import ReactDOM from 'react-dom/client'

// ThemeProvider is required for Material-UI
import { ThemeProvider } from '@mui/material'

// Import the theme
import theme from './config/theme'

import App from './App.tsx'
import './index.css'
import { ProSidebarProvider } from 'react-pro-sidebar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ProSidebarProvider>
  </React.StrictMode>,
)
