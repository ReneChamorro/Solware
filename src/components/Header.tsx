import React, { useState, useEffect } from 'react'
import { Menu, X, Code2, Moon, Sun } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useDarkMode } from '../hooks/useDarkMode'
import { useTranslation } from 'react-i18next'
import LanguageDropdown from './LanguageDropdown'

export default function Header() {
	const { t } = useTranslation()
	const navItems = [
		{ href: '#quienes-somos', label: t('header.navItems.quienesSomos') },
		{ href: '#proceso', label: t('header.navItems.workflow') },
		{
			label: t('header.navItems.soluciones'),
			items: [
				{ href: '#servicios', label: t('header.navItems.servicios') },
				{ href: '#automatizacion', label: t('header.navItems.automatizacion') },
				{ href: '#pricing', label: t('header.navItems.masVendidos') },
			],
		},
		{ href: '#contacto', label: t('header.navItems.contacto') },
	]

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const activeSection = useActiveSection()
	const { isDark, setIsDark } = useDarkMode()
	const [openDropdown, setOpenDropdown] = useState(false)
	const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest('.dropdown')) {
				setOpenDropdown(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
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

	const toggleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleMouseEnter = () => {
		if (closeTimeout) {
			clearTimeout(closeTimeout)
			setCloseTimeout(null)
		}
		setOpenDropdown(true)
	}

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setOpenDropdown(false)
		}, 300)
		setCloseTimeout(timeout)
	}

	return (
		<>
			<header
				className={`fixed w-full z-50 transition-all duration-300 ${
					isScrolled
						? 'bg-white dark:bg-gray-900 shadow-sm md:bg-white/70 md:dark:bg-gray-900/70 md:backdrop-blur-md'
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
							{navItems.map((item) =>
								item.items ? (
									<div
										key={item.label}
										className="relative inline-block text-left dropdown"
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										<div>
											<button
												type="button"
												onClick={toggleDropdown}
												className={`flex items-center w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm lg:text-base font-semibold shadow-xs transition-colors duration-300 ${
													isScrolled
														? activeSection === 'servicios' || activeSection === 'automatizacion' || activeSection === 'pricing'
															? 'text-blue-600 dark:text-blue-400'
															: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
														: 'text-white hover:text-blue-200'
												}`}
												id="menu-button"
												aria-expanded={openDropdown}
												aria-haspopup="true"
											>
												{item.label}
												<svg
													className={`size-5 -rotate-90 transition-transform ${openDropdown ? 'rotate-0' : ''}`}
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
													data-slot="icon"
												>
													<path
														fillRule="evenodd"
														d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
										</div>
										<div
											className={` opacity-0 transition-all -translate-y-20 duration-300 ${
												openDropdown ? 'opacity-100 -translate-y-9' : 'opacity-0 -translate-y-20'
											}`}
										>
											{openDropdown && (
												<div
													className={`absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md shadow-[0_0px_13px_1px] transition-all duration-300 bg-white dark:bg-dark ring-1 ring-dark-900/50 dark:ring-gray-800/50 shadow-dark-900/50 dark:shadow-dark-800/50 top-14`}
													role="menu"
													aria-orientation="vertical"
													aria-labelledby="menu-button"
													tabIndex={-1}
												>
													<div role="none">
														{item.items.map((subItem) => (
															<a
																key={subItem.href}
																href={subItem.href}
																onClick={handleNavClick}
																className={`block px-4 py-3 text-sm transition-all duration-300 hover:bg-gray-500/10 rounded-t-md last:rounded-b-md last:rounded-t-none ${
																	isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
																}`}
																role="menuitem"
																tabIndex={-1}
															>
																{subItem.label}
															</a>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								) : (
									<a
										key={item.href}
										href={item.href}
										onClick={handleNavClick}
										className={`px-3 py-2 rounded-md text-sm lg:text-base transition-colors font-medium duration-200 ${
											isScrolled
												? activeSection === (item.href ? item.href.replace('#', '') : '')
													? 'text-blue-600 dark:text-blue-400'
													: 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
												: 'text-white hover:text-blue-200'
										}`}
									>
										{item.label}
									</a>
								),
							)}
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
								href="https://calendar.app.google/EYruMbWpJwJ82gHr6"
								target="_blank"
								className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base 
                  transition-colors duration-300 whitespace-nowrap ${
										isScrolled
											? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
											: 'bg-white/10 text-white hover:bg-white/20'
									}`}
							>
								{t('header.consulta')}
							</a>
							<LanguageDropdown />
						</div>

						{/* Menu mobile */}

						<div className="md:hidden flex gap-2 items-center">
							<LanguageDropdown />

							<button
								className={`px-1 rounded-lg ${isScrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
							>
								{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
				</div>

				<div
					className={`md:hidden fixed inset-0 z-[60] transition-all duration-300 ${
						isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
					}`}
				>
					<div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />

					<div
						className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900
              shadow-xl transition-transform duration-300 transform ${
								isMenuOpen ? 'translate-x-0' : 'translate-x-full'
							}`}
					>
						<div className="flex flex-col h-full">
							<div className="flex justify-end p-4">
								<button
									onClick={() => setIsMenuOpen(false)}
									className="p-2 rounded-lg text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-500/30 transition-colors"
								>
									<X className="h-6 w-6" />
								</button>
							</div>

							<nav className="flex-1 px-4 pb-4 space-y-1">
								{navItems.map((item) =>
									item.items ? (
										<div key={item.label} className="dropdown">
											<div
												className={`w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 cursor-pointer ${
													activeSection === 'servicios' || activeSection === 'automatizacion'
														? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
														: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500/30'
												}`}
												onClick={toggleDropdown}
											>
												<button
													type="button"
													className="flex items-center justify-between w-full"
													id="menu-button-mobile"
													aria-expanded={openDropdown}
													aria-haspopup="true"
												>
													<span>{item.label}</span>
													<svg
														className={`size-5 -rotate-90 transition-transform ${openDropdown ? 'rotate-0' : ''}`}
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
														data-slot="icon"
													>
														<path
															fillRule="evenodd"
															d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</div>
											<div
												className={` opacity-0 transition-all -translate-y-5 duration-300 ${
													openDropdown ? 'opacity-100 translate-y-1' : 'opacity-0 -translate-y-5'
												}`}
											>
												{openDropdown && (
													<div
														className={`mt-2 w-full rounded-md focus:outline-hidden transition-all duration-200 ease-out transform bg-white dark:bg-dark ring-1 ring-dark-900/50 dark:ring-gray-800/50 shadow-dark-900/50 dark:shadow-dark-800/50 shadow-[0_0px_13px_1px]`}
														role="menu"
														aria-orientation="vertical"
														aria-labelledby="menu-button-mobile"
														tabIndex={-1}
													>
														<div className="py-1" role="none">
															{item.items.map((subItem) => (
																<a
																	key={subItem.href}
																	href={subItem.href}
																	onClick={handleNavClick}
																	className={`block ml-4 py-2 text-sm font-medium transition-colors duration-300 ${
																		isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
																	}`}
																	role="menuitem"
																	tabIndex={-1}
																>
																	{subItem.label}
																</a>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
									) : (
										<a
											key={item.href}
											href={item.href}
											onClick={handleNavClick}
											className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
												activeSection === (item.href ? item.href.replace('#', '') : '')
													? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
													: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500/30'
											}`}
										>
											{item.label}
										</a>
									),
								)}
							</nav>

							<div className="p-4 border-t border-gray-200 dark:border-gray-800">
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={toggleDarkMode}
										className="p-2 rounded-full transition-colors duration-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                      hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300
                      hover:text-blue-600 dark:hover:text-blue-400"
										aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
									>
										{isDark ? (
											<Sun className="h-5 w-5" />
										) : (
											<Moon className="h-5 w-5" />
										)}
									</button>
								</div>

								<a
									href="https://calendar.app.google/EYruMbWpJwJ82gHr6"
									target="_blank"
									className="block w-full px-4 py-3 rounded-lg text-lg font-medium text-center
                    bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600
                    transition-colors"
								>
									{t('header.consulta')}
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
