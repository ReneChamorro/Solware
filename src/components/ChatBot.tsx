import React, { useState, useEffect, useRef } from 'react'
import { X, Send } from 'lucide-react'
import { FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa'
import RobotTraking from './RobotTraking'
import RobotTrackingChat from './RoboTrakChat'

interface Message {
	id: number
	text: string
	isBot: boolean
	timestamp: Date
	options?: (string | { text: string; icon: JSX.Element })[] // Updated to accept both strings and objects
	details?: string[] // Agregamos detalles para mensajes con múltiples líneas
}

// Definimos las respuestas del bot por categorías
const botResponses = {
	initial: {
		text: '¡Hola! Soy Solwy, el asistente virtual de Solware. ¿Sobre qué te gustaría saber más?',
		options: ['Servicios', 'Precios', 'Proceso de trabajo', 'Contacto'],
	},
	servicios: {
		text: 'Ofrecemos varios servicios de transformación digital. ¿Cuál te interesa conocer?',
		options: [
			'Automatización de procesos',
			'Desarrollo web/móvil',
			'CRM y gestión',
			'Marketing digital',
			'Consultoría tecnológica',
		],
		responses: {
			'automatización de procesos':
				'Optimizamos y automatizamos procesos empresariales para aumentar la eficiencia y reducir costos. Esto incluye:\n• Automatización de facturación\n• Gestión de inventario\n• Flujos de trabajo\n• Integración de sistemas',
			'desarrollo web/móvil':
				'Desarrollamos soluciones web y móviles personalizadas usando las últimas tecnologías:\n• Sitios web responsivos\n• Aplicaciones web progresivas\n• Apps móviles nativas\n• Plataformas empresariales',
			'crm y gestión':
				'Implementamos sistemas CRM para mejorar la gestión de clientes:\n• Seguimiento de leads\n• Automatización de marketing\n• Gestión de ventas\n• Análisis de datos',
			'marketing digital':
				'Ofrecemos estrategias de marketing digital para aumentar la visibilidad y el alcance de tu negocio:\n• SEO y SEM\n• Publicidad en redes sociales\n• Email marketing\n• Creación de contenido',
			'consultoría tecnológica':
				'Brindamos consultoría tecnológica para optimizar tus procesos y adoptar nuevas tecnologías:\n• Evaluación de sistemas existentes\n• Recomendaciones de software\n• Implementación de soluciones tecnológicas\n• Capacitación y soporte',
		},
	},
	precios: {
		text: 'Nuestros precios varían según el proyecto y sus necesidades específicas. ¿Te gustaría que te contactemos para una cotización personalizada?',
		options: ['Sí, quiero una cotización', 'Volver al menú'],
	},
	proceso: {
		text: 'Nuestro proceso de trabajo consta de 4 fases principales:',
		details: [
			'1. Análisis y Planificación: Evaluamos tus necesidades y definimos objetivos',
			'2. Diseño de Solución: Creamos una propuesta personalizada',
			'3. Implementación: Desarrollamos e implementamos la solución',
			'4. Seguimiento: Monitoreamos y optimizamos resultados',
		],
		options: ['Comenzar proyecto', 'Volver al menú'],
	},
	contacto: {
		text: 'Puedes contactarnos por varios medios:',
		options: [
			{ text: 'Enviar email', icon: <FaEnvelope /> },
			{ text: 'Abrir WhatsApp', icon: <FaWhatsapp /> },
			{ text: 'Abrir Instagram', icon: <FaInstagram /> },
			{ text: 'Abrir LinkedIn', icon: <FaLinkedin /> },
		],
	},
}

const contactoDetails = [
	{ icon: <FaEnvelope />, text: 'ventas@solware.agency', link: 'mailto:ventas@solware.agency' },
	{
		icon: <FaWhatsapp />,
		text: '+58 412-9974533',
		link: 'https://api.whatsapp.com/send/?phone=584129974533&text=Hola%2C+me+gustar%C3%ADa+obtener+m%C3%A1s+informaci%C3%B3n+sobre+sus+servicios.&type=phone_number&app_absent=0',
	},
	{ icon: <FaInstagram />, text: '@solware_', link: 'https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA==' },
	{ icon: <FaLinkedin />, text: 'Agencia', link: 'https://www.linkedin.com/company/agencia-solware/' },
]

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			text: botResponses.initial.text,
			isBot: true,
			timestamp: new Date(),
			options: botResponses.initial.options,
		},
	])
	const [inputMessage, setInputMessage] = useState('')
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	const chatRef = useRef<HTMLDivElement | null>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (event: MouseEvent) => {
			if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	const handleBotResponse = (userInput: string) => {
		const input = userInput.toLowerCase()
		let response: Message

		// Lógica para determinar la respuesta según el input del usuario
		if (
			input.includes('hola') ||
			input.includes('saludos') ||
			input.includes('cómo estás') ||
			input.includes('ayuda')
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.initial.text, // Respuesta de saludo
				isBot: true,
				timestamp: new Date(),
				options: botResponses.initial.options,
			}
		} else if (
			input.includes('servicio') ||
			input.includes('web') ||
			input.includes('marketing') ||
			input.includes('aplicacion') ||
			input.includes('movil') ||
			input.includes('telefono') ||
			input.includes('celular') ||
			input.includes('crm')
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.servicios.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.servicios.options,
			}
		} else if (
			input.includes('precio') ||
			input.includes('costo') ||
			input.includes('dinero') ||
			input.includes('cuanto cuesta')
		) {
			response = {
				id: messages.length + 2,
				text: botResponses.precios.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.precios.options,
			}
		} else if (input.includes('proceso') || input.includes('trabajo')) {
			response = {
				id: messages.length + 2,
				text: botResponses.proceso.text + '\n\n' + botResponses.proceso.details.join('\n'),
				isBot: true,
				timestamp: new Date(),
				options: botResponses.proceso.options,
			}
		} else if (input.includes('contacto')) {
			response = {
				id: messages.length + 2,
				text: botResponses.contacto.text,
				isBot: true,
				timestamp: new Date(),
				options: botResponses.contacto.options,
			}
		} else {
			// Respuesta por defecto si no se reconoce el input
			response = {
				id: messages.length + 2,
				text: 'No estoy seguro de entender tu pregunta. ¿Podrías seleccionar una de estas opciones?',
				isBot: true,
				timestamp: new Date(),
				options: botResponses.initial.options,
			}
		}

		return response
	}

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!inputMessage.trim()) return

		// Mensaje del usuario
		const userMessage: Message = {
			id: messages.length + 1,
			text: inputMessage,
			isBot: false,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputMessage('')

		// Respuesta del bot
		setTimeout(() => {
			const botResponse = handleBotResponse(userMessage.text)
			setMessages((prev) => [...prev, botResponse])
		}, 1000)
	}

	const handleOptionClick = (option: string) => {
		// Simular que el usuario escribió la opción
		const userMessage: Message = {
			id: messages.length + 1,
			text: option,
			isBot: false,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])

		// Respuesta del bot
		setTimeout(() => {
			let botResponse: Message

			if (option === 'Volver al menú') {
				// Regresar al mensaje inicial de saludo
				botResponse = {
					id: messages.length + 2,
					text: botResponses.initial.text,
					isBot: true,
					timestamp: new Date(),
					options: botResponses.initial.options,
				}
			} else if (option === 'Comenzar proyecto' || option === 'Sí, quiero una cotización') {
				// Redirigir a la sección de contacto
				botResponse = {
					id: messages.length + 2,
					text: botResponses.contacto.text,
					isBot: true,
					timestamp: new Date(),
					options: botResponses.contacto.options,
				}
			} else if (option === 'Enviar email') {
				window.open('mailto:solwareve@gmail.com') // Abrir cliente de email
				return // Salir para no agregar un mensaje del bot
			} else if (option === 'Abrir WhatsApp') {
				const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.')
				window.open(`https://wa.me/584126652245?text=${message}`, '_blank') // Abrir WhatsApp
				return // Salir para no agregar un mensaje del bot
			} else if (option === 'Abrir Instagram') {
				window.open('https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA==', '_blank') // Abrir Instagram
				return // Salir para no agregar un mensaje del bot
			} else if (option === 'Abrir LinkedIn') {
				window.open('https://www.linkedin.com/company/agencia-solware/', '_blank') // Abrir LinkedIn
				return // Salir para no agregar un mensaje del bot
			} else {
				botResponse = handleBotResponse(option)
			}

			setMessages((prev) => [...prev, botResponse])
		}, 1000)
	}

	return (
		<>
			{/* Botón flotante del chat */}
			<button
				onClick={() => setIsOpen(true)}
				className={`p-3 pl-0 text-white rounded-full transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
				title="Chatbot"
			>
				<RobotTraking className={'size-16 md:size-24'} />
			</button>

			{/* Ventana del chat */}
			<div
				className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[600px] bg-white dark:bg-gray-800 
          shadow-[0_-8px_32px_rgba(0,0,0,0.15),_-5px_0_15px_rgba(0,0,0,0.1),_5px_0_15px_rgba(0,0,0,0.1)]
          dark:shadow-[0_-8px_32px_rgba(0,0,0,0.3),_-5px_0_15px_rgba(0,0,0,0.2),_5px_0_15px_rgba(0,0,0,0.2)]
          transition-transform duration-300 transform 
          sm:rounded-t-2xl
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
				ref={chatRef}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 bg-blue-600 text-white sm:rounded-t-2xl">
					<div className="flex items-center">
						<RobotTrackingChat />
						<h3 className="font-semibold ml-4">Solwy</h3>
					</div>
					<button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded-full transition-colors">
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Messages Container */}
				<div className="flex-1 p-4 h-[calc(600px-8rem)] overflow-y-auto">
					<div className="space-y-4">
						{messages.map((message) => (
							<div key={message.id}>
								<div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
									<div
										className={`max-w-[80%] p-3 rounded-lg ${
											message.isBot
												? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
												: 'bg-blue-600 text-white'
										}`}
									>
										<p className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: message.text }}></p>
										{message.isBot && message.details && (
											<div className="mt-2">
												{contactoDetails.map((detail, index) => (
													<div key={index} className="text-sm">
														<span className="link">
															{detail.icon}{' '}
															<a href={detail.link} target="_blank" rel="noopener noreferrer">
																{detail.text}
															</a>
														</span>
													</div>
												))}
											</div>
										)}
										<span className="text-xs opacity-70 mt-1 block">
											{message.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									</div>
								</div>
								{message.isBot && message.options && (
									<div className="mt-3 flex flex-wrap gap-2">
										{message.options.map((option, index) => (
											<button
												key={index}
												onClick={() => handleOptionClick(typeof option === 'string' ? option : option.text)}
												className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 
                          dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 
                          transition-colors"
											>
												{typeof option === 'string' ? (
													option
												) : (
													<span className="flex items-center gap-2">
														{option.icon} {option.text}
													</span>
												)}
											</button>
										))}
									</div>
								)}
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input Form */}
				<form
					onSubmit={handleSendMessage}
					className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t 
            dark:border-gray-700"
				>
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							placeholder="Escribe tu mensaje..."
							className="flex-1 p-2 border dark:border-gray-600 rounded-lg bg-white 
                dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
						<button
							type="submit"
							className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors"
						>
							<Send className="h-5 w-5" />
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ChatBot
