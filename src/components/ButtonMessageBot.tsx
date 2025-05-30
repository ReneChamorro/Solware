import { useEffect, useState } from 'react'
import ChatBot from './ChatBot'

function ButtonMessageBot() {
	const [showMessage, setShowMessage] = useState(true)
	const [isChatBotOpen, setIsChatBotOpen] = useState(false)

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
		<div className="fixed bottom-1 right-1 z-40">
			<div className="flex items-end">
				{showMessage && (
					<button
						onClick={() => setIsChatBotOpen(true)}
						className={`sticky bottom-96 flex items-center bg-blue-600/80 dark:bg-white/20 backdrop-blur-2xl px-4 py-2 rounded-full shadow-lg transition-all duration-300 font-semibold text-white animate-bounce opacity-100 scale-100`}
					>
						<span className="text-xs md:text-sm">Soy Solwy. ¡Chatea conmigo!</span>
					</button>
				)}
				<ChatBot isOpen={isChatBotOpen} setIsOpen={setIsChatBotOpen} />
			</div>
		</div>
	)
}

export default ButtonMessageBot
