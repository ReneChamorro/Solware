import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import NotFound from './components/NotFound'
import PrivacyPolicy from './components/PrivacyPolicy'
import Demonstration from './components/Demonstration'
import Dashboard from './components/Dashboard'
import './index.css'

// Inicializar el tema oscuro antes de renderizar
const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Configuración de future flags para React Router v7
const routerOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BrowserRouter {...routerOptions}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<Demonstration />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)