import React, { useState } from 'react';
import { Menu, X, Code2, Moon, Sun } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { useDarkMode } from '../hooks/useDarkMode';

const navItems = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Workflow' },
  { href: '#automatizacion', label: 'Automatización' },
  { href: '#contacto', label: 'Contacto' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { isDark, setIsDark } = useDarkMode();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (!element) return;
    
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="fixed w-full bg-white/95 dark:bg-dark/95 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a 
            href="#inicio" 
            onClick={handleNavClick}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
              Solware
            </span>
          </a>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className={`transition-colors duration-200 ${
                  activeSection === href.replace('#', '')
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                transition-colors duration-300 focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400"
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 
              rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 
              transition-colors duration-300">
              Consulta Gratis
            </button>
          </div>

          <button 
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark border-t border-gray-100 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === href.replace('#', '')
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </a>
            ))}
            <div className="px-3 py-2 flex items-center justify-between">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                {isDark ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Modo claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Modo oscuro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}