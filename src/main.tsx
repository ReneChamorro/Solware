import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, UNSAFE_useScrollRestoration } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import App from './App'
import NotFound from './components/NotFound'
import PrivacyPolicy from './components/PrivacyPolicy'
import Demonstration from './components/Demonstration'
import Dashboard from './components/Dashboard'
import './index.css'

// Obtener la clave de Clerk desde las variables de entorno
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key')
}

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
		v7_startTransition: true, // Habilita el uso de startTransition para actualizaciones de ruta
		v7_relativeSplatPath: true, // Habilita el manejo relativo de rutas splat
	},
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<BrowserRouter {...routerOptions}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/demo" element={<Demonstration />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route
						path="/dashboard"
						element={
							<>
								<SignedIn>
									<Dashboard />
								</SignedIn>
								<SignedOut>
									<RedirectToSignIn />
								</SignedOut>
							</>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ClerkProvider>
	</StrictMode>,
)