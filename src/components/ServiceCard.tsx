import React, { useState, useRef, useEffect, memo } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface ServiceCardProps {
	title: string
	description: string
	icon: React.ReactNode
	image: string
	details: {
		title: string
		description: string
	}[]
}

const ServiceCard = memo(
	({ title, description, icon, image, details }: ServiceCardProps) => {
		const [isFlipped, setIsFlipped] = useState(false)
		const cardRef = useRef<HTMLDivElement | null>(null)

		useEffect(() => {
			if (!isFlipped) return
			const handleClickOutside = (event: MouseEvent) => {
				if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
					setIsFlipped(false)
				}
			}
			document.addEventListener('mousedown', handleClickOutside)
			return () => document.removeEventListener('mousedown', handleClickOutside)
		}, [isFlipped])

		return (
			<div ref={cardRef} className="perspective-1000 w-full h-[22.4rem] sm:h-[26.6rem]">
				<div
					className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
						isFlipped ? 'rotate-y-180' : ''
					}`}
				>
					{/* Front of card */}
					<div className="absolute w-full h-full backface-hidden" onClick={() => setIsFlipped((f) => !f)}>
						<div
							className="h-full bg-blue-600 rounded-2xl shadow-lg overflow-hidden group 
            hover:shadow-xl transition-all duration-300"
						>
							<div className="relative h-40 sm:h-48 overflow-hidden">
								<img
									src={image}
									alt={title}
									className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
								<div className="absolute bottom-4 left-4">
									<div className="bg-white/90 dark:bg-white/90 p-2 rounded-lg backdrop-blur-sm">
										{React.cloneElement(icon, {
											className: 'h-6 w-6 text-blue-600',
										})}
									</div>
								</div>
							</div>

							<div className="p-4 sm:p-6">
								<h3 className="text-lg sm:text-xl font-bold text-white mb-2 transition-colors duration-300">{title}</h3>
								<p className="text-sm sm:text-base text-white/90 mb-4 transition-colors duration-300">{description}</p>

								<button
									className="inline-flex items-center text-white font-medium 
                  hover:text-white/80 transition-colors group/btn text-sm sm:text-base"
								>
									Saber más
									<ChevronRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
								</button>
							</div>
						</div>
					</div>

					{/* Back of card */}
					<div className="absolute w-full h-full backface-hidden rotate-y-180" onClick={() => setIsFlipped((f) => !f)}>
						<div className="h-full bg-blue-600 dark:bg-blue-600 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col">
							<h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 transition-colors duration-300">
								Detalles del Servicio
							</h3>

							<div className="flex-grow space-y-4 sm:space-y-6 overflow-y-auto scrollbar-hide">
								{details.map((detail, index) => (
									<div key={index} className="group">
										<h4
											className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2 
                    transition-colors duration-300 group-hover:text-white/90"
										>
											{detail.title}
										</h4>
										<p
											className="text-xs sm:text-sm text-white/80 transition-colors duration-300 
                    leading-relaxed group-hover:text-white/90"
										>
											{detail.description}
										</p>
									</div>
								))}
							</div>

							<button
								className="mt-4 sm:mt-6 inline-flex items-center text-white 
                font-medium hover:text-white/80 transition-colors 
                group/btn text-sm sm:text-base"
							>
								<ArrowLeft className="mr-2 h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
								Volver
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	},
	(prevProps, nextProps) => {
		return prevProps.title === nextProps.title && prevProps.description === nextProps.description
	},
)

export default ServiceCard
