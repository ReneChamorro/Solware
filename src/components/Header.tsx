import React, { useState, useEffect } from 'react'
import { Menu, X, Code2, Moon, Sun, UserRound } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useDarkMode } from '../hooks/useDarkMode'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const navItems = [
	{ href: '#inicio', label: 'Inicio' },
	{ href: '#quienes-somos', label: 'Quiénes Somos' },
	{ href: '#servicios', label: 'Servicios' },
	{ href: '#proceso', label: 'Workflow' },
	{ href: '#automatizacion', label: 'Automatización' },
	{ href: '#contacto', label: 'Contacto' },
]

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const activeSection = useActiveSection()
	const { isDark, setIsDark } = useDarkMode()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const href = e.currentTarget.getAttribute('href')
		if (!href) return

		const targetId = href.replace('#', '')
		const element = document.getElementById(targetId)
		if (!element) return

		const headerHeight = 80
		const elementPosition = element.getBoundingClientRect().top
		const offsetPosition = elementPosition + window.pageYOffset - headerHeight

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		})

		setIsMenuOpen(false)
	}

	const toggleDarkMode = () => {
		setIsDark(!isDark)
	}

	return (
		<>
			<header
				className={`fixed w-full z-50 transition-all duration-300 ${
					isScrolled
						? 'bg-white dark:bg-gray-900 md:bg-white/70 md:dark:bg-dark/70 md:backdrop-blur-md shadow-sm'
						: 'bg-transparent'
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16 sm:h-20">
						<a
							href="#inicio"
							onClick={handleNavClick}
							className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${
								isScrolled ? '' : 'text-white'
							}`}
						>
							<Code2
								className={`h-7 w-7 sm:h-8 sm:w-8 ${isScrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'}`}
							/>
							<span
								className={`text-xl sm:text-2xl font-bold ${
									isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
								}`}
							>
								Solware
							</span>
						</a>

						<nav className="hidden md:flex space-x-1 lg:space-x-8">
							{navItems.map(({ href, label }) => (
								<a
									key={href}
									href={href}
									onClick={handleNavClick}
									className={`px-3 py-2 rounded-md text-sm lg:text-base transition-colors font-medium duration-200 ${
										isScrolled
											? activeSection === href.replace('#', '')
												? 'text-blue-600 dark:text-blue-400'
												: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
											: 'text-white hover:text-blue-200'
									}`}
								>
									{label}
								</a>
							))}
						</nav>

						<div className="hidden md:flex items-center space-x-4">
							<button
								onClick={toggleDarkMode}
								className={`p-2 rounded-full transition-colors duration-300 
									focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
										isScrolled ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'hover:bg-white/10'
									}`}
								aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
							>
								{isDark ? (
									<Sun className={`h-5 w-5 ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
								) : (
									<Moon className={`h-5 w-5 ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
								)}
							</button>

							<a
								href="#contacto"
								onClick={handleNavClick}
								className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base 
									transition-colors duration-300 whitespace-nowrap ${
										isScrolled
											? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
											: 'bg-white/10 text-white hover:bg-white/20'
									}`}
							>
								Consulta Gratis
							</a>
							<SignedIn>
								<UserButton afterSignOutUrl="/" />
							</SignedIn>
							<SignedOut>
								<SignInButton mode="modal" redirectUrl="/dashboard">
									<button
										className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base 
											transition-all duration-300 whitespace-nowrap hover:scale-125 ${
												isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'
											}`}
									>
										<UserRound />
									</button>
								</SignInButton>
							</SignedOut>
						</div>

						<div className="md:hidden flex gap-2">
							<SignedIn>
								<div className="flex items-center justify-between mb-4">
									<UserButton afterSignOutUrl="/" />
								</div>
							</SignedIn>
							<SignedOut>
								<SignInButton mode="modal">
									<button
										className={`w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
											isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'
										}`}
									>
										<UserRound />
									</button>
								</SignInButton>
							</SignedOut>
							<button
								className={`px-4 py-3 rounded-lg ${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
							>
								{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				{/* Menú móvil */}
				<div
					className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
						isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
					}`}
				>
					<div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />

					<div
						className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 
							shadow-xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
					>
						<div className="flex flex-col h-full">
							<div className="flex justify-end p-4">
								<button
									onClick={() => setIsMenuOpen(false)}
									className="p-2 rounded-lg text-gray-700 dark:text-gray-300
										hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								>
									<X className="h-6 w-6" />
								</button>
							</div>

							<nav className="flex-1 px-4 pb-4 space-y-1">
								{navItems.map(({ href, label }) => (
									<a
										key={href}
										href={href}
										onClick={handleNavClick}
										className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
											activeSection === href.replace('#', '')
												? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
										}`}
									>
										{label}
									</a>
								))}
							</nav>

							<div className="p-4 border-t border-gray-200 dark:border-gray-800">
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={toggleDarkMode}
										className="flex items-center space-x-2 text-gray-700 dark:text-gray-300
											hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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

								<a
									href="#contacto"
									onClick={handleNavClick}
									className="block w-full px-4 py-3 rounded-lg text-lg font-medium text-center
										bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600
										transition-colors"
								>
									Consulta Gratis
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
