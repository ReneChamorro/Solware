import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route,
  UNSAFE_UNSAFE_useScrollRestoration,
  UNSAFE_enhanceManualRouteObjects
} from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';
import PrivacyPolicy from './components/PrivacyPolicy';
import './index.css';

// Inicializar el tema oscuro antes de renderizar
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Configuración de future flags para React Router v7
const routerOptions = {
  future: {
    v7_startTransition: true,    // Habilita el uso de startTransition para actualizaciones de ruta
    v7_relativeSplatPath: true,  // Habilita el manejo relativo de rutas splat
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter {...routerOptions}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);