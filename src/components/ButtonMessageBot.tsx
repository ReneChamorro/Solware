import { useEffect, useState } from 'react'
import ChatBot from './ChatBot'
import { useTranslation } from 'react-i18next'

function ButtonMessageBot() {
	const [showMessage, setShowMessage] = useState(true)
	const [isChatBotOpen, setIsChatBotOpen] = useState(false)
	const { t } = useTranslation()
	useEffect(() => {
		let showTimeout: NodeJS.Timeout
		let interval: NodeJS.Timeout

		const startCycle = () => {
			setShowMessage(true)
			showTimeout = setTimeout(() => setShowMessage(false), 5000) // tiempo de espera para ocultar el mensaje
		}

		startCycle()
		interval = setInterval(startCycle, 10000) // tiempo que pasa el mensaje oculto antes de volver a aparecer

		return () => {
			clearTimeout(showTimeout)
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="fixed bottom-[70px] sm:bottom-[80px] md:bottom-5 right-3 sm:right-5 z-50">
			<div className="flex items-end gap-2">
				{showMessage && (
					<button
						onClick={() => setIsChatBotOpen(true)}
						className={`flex items-center bg-blue-600/80 dark:bg-white/20 backdrop-blur-2xl px-4 py-2 rounded-full shadow-lg transition-all duration-300 font-semibold text-white animate-bounce opacity-100 scale-100 hidden md:flex`}
					>
						<span className="text-xs md:text-sm">
							{t('robotButton.title')}
						</span>
					</button>
				)}
				<ChatBot isOpen={isChatBotOpen} setIsOpen={setIsChatBotOpen} />
			</div>
		</div>
	)
}

export default ButtonMessageBot
