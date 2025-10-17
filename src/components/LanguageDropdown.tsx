import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import i18n from 'i18next'

function LanguageDropdown() {
	const { t } = useTranslation()
	const location = useLocation()
	const [openDropdown, setOpenDropdown] = useState(false)
	const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)
	const [isScrolled, setIsScrolled] = useState(false)
	
	// Detectar si estamos en la página de servicios
	const isServicesPage = location.pathname === '/services'
	
	// Definir los idiomas disponibles
	const languages = [
		{ code: 'es', label: t('header.language.es') },
		{ code: 'en', label: t('header.language.en') }
	]
	
	const toggleDropdown = () => {
		setOpenDropdown(!openDropdown)
	}
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	
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

	// Función modificada para cambiar a un idioma específico
	const changeLanguage = (langCode: string) => {
		if (i18n.language !== langCode) {
			i18n.changeLanguage(langCode)
		}
		setOpenDropdown(false)
	}

	const currentLanguageLabel = i18n.language === 'es' ? 'ES' : 'EN'

	return (
		<div
			className="relative inline-block text-left dropdown"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div>
				<button
					type="button"
					onClick={toggleDropdown}
					className={`flex items-center w-fit justify-center rounded-md px-3 py-2 text-sm lg:text-base font-semibold shadow-xs transition-colors duration-300 ${
						isServicesPage || isScrolled
							? 'text-blue-600 dark:text-blue-400'
							: 'text-white hover:text-blue-200'
					}`}
					id="menu-button"
					aria-expanded={openDropdown}
					aria-haspopup="true"
				>
					{currentLanguageLabel}
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
				className={`opacity-0 transition-all -translate-y-20 duration-300 ${
					openDropdown ? 'opacity-100 -translate-y-9' : 'opacity-0 -translate-y-20'
				}`}
			>
				{openDropdown && (
					<div
						className={`absolute right-0 z-20 mt-2 w-fit text-center cursor-pointer origin-top-right rounded-md shadow-[0_0px_13px_1px] transition-all duration-300 bg-white dark:bg-dark ring-1 ring-dark-900/50 dark:ring-gray-800/50 shadow-dark-900/50 dark:shadow-dark-800/50 top-14`}
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
						tabIndex={-1}
					>
						<div role="none">
							{languages.map((language) => (
								<a
									key={language.code}
									className={`block px-4 py-3 text-sm transition-all duration-300 hover:bg-gray-500/10 rounded-t-md last:rounded-b-md last:rounded-t-none ${
										i18n.language === language.code 
											? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
											: 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
									}`}
									role="menuitem"
									tabIndex={-1}
									onClick={() => changeLanguage(language.code)}
								>
									{language.label}
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default LanguageDropdown