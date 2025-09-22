import { Lightbulb, Target, Rocket } from 'lucide-react'
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'


const AboutUs = () => {
	const { t } = useTranslation()
	const [autoHoverIndex, setAutoHoverIndex] = useState(-1)
	const [isManualHover, setIsManualHover] = useState(false)
	const [manualHoverIndex, setManualHoverIndex] = useState(-1)

	// Auto hover animation effect
	useEffect(() => {
		if (!isManualHover) {
			const initialDelay = 2000 // 2 segundos de delay inicial

			let intervalId: NodeJS.Timeout
			const timeoutId = setTimeout(() => {
				setAutoHoverIndex(0) // Inicia el autohover después del delay

				intervalId = setInterval(() => {
					setAutoHoverIndex(prev => {
						const nextIndex = (prev + 1) % 3 // 3 paneles total
						return nextIndex
					})
				}, 3000) // Cada 3 segundos
			}, initialDelay)

			return () => {
				clearTimeout(timeoutId)
				clearInterval(intervalId)
			}
		}
	}, [isManualHover])

	// Handle manual hover
	const handleMouseEnter = (index: number) => {
		setIsManualHover(true)
		setManualHoverIndex(index)
		setAutoHoverIndex(-1) // Stop auto hover
	}

	const handleMouseLeave = () => {
		setIsManualHover(false)
		setManualHoverIndex(-1)
		// Auto hover will resume due to useEffect dependency
	}

	return (
		<section
			id="quienes-somos"
			className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark text-justify"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<BlurText
						text={t('about.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('about.subtitle')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Timeline/Comic Style Story */}
					<div className="space-y-7">
						<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{t('about.story.title')}</h3>
						
						{/* Comic-style timeline */}
						<div className="relative">
							{/* Timeline line without pulse animation */}
							<div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600 via-purple-500 to-blue-500"></div>
							
							{/* Story panels */}
							<div className="space-y-8">
								{/* Panel 1 */}
								<div className="relative pl-16">
									<div 
										className="absolute left-0 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center shadow-lg" 
										style={{ 
											top: '-5px'
										}}>
										<Lightbulb className="w-5 h-5 text-white" />
									</div>
									<div 
										className={`group bg-pink-100 dark:bg-pink-900/30 rounded-lg p-5 border-l-4 border-pink-600 shadow-md cursor-pointer
											transition-all duration-300 
											hover:bg-pink-200 dark:hover:bg-pink-800/50 
											hover:-translate-y-2 hover:shadow-xl hover:scale-105 
											hover:shadow-pink-400/40 dark:hover:shadow-pink-400/40
											hover:border-pink-500 ${
												isManualHover ? 
													(manualHoverIndex === 0 ? 'bg-pink-200 dark:bg-pink-800/50 -translate-y-2 shadow-xl scale-105 shadow-pink-400/40 dark:shadow-pink-400/40 border-pink-500' : '') :
													(autoHoverIndex === 0 ? 'bg-pink-200 dark:bg-pink-800/50 -translate-y-2 shadow-xl scale-105 shadow-pink-400/40 dark:shadow-pink-400/40 border-pink-500' : '')
											}`}
										style={{ marginTop: '10px' }}
										onMouseEnter={() => handleMouseEnter(0)}
										onMouseLeave={handleMouseLeave}
									>
										<p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed
											group-hover:text-gray-800 dark:group-hover:text-white
											transition-all duration-300">{t('about.story.paragraph1')}</p>
									</div>
								</div>
								
								{/* Panel 2 */}
								<div className="relative pl-16">
									<div 
										className="absolute left-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg" 
										style={{ 
											top: '10px'
										}}>
										<Target className="w-5 h-5 text-white" />
									</div>
									<div 
										className={`group bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-5 border-l-4 border-purple-500 shadow-md cursor-pointer
											transition-all duration-300 
											hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40
											hover:-translate-y-2 hover:shadow-xl hover:scale-105 
											hover:shadow-purple-400/40 dark:hover:shadow-purple-400/40
											hover:border-purple-400 ${
												isManualHover ? 
													(manualHoverIndex === 1 ? 'from-purple-100 to-purple-200 dark:from-purple-800/40 dark:to-purple-700/40 -translate-y-2 shadow-xl scale-105 shadow-purple-400/40 dark:shadow-purple-400/40 border-purple-400' : '') :
													(autoHoverIndex === 1 ? 'from-purple-100 to-purple-200 dark:from-purple-800/40 dark:to-purple-700/40 -translate-y-2 shadow-xl scale-105 shadow-purple-400/40 dark:shadow-purple-400/40 border-purple-400' : '')
											}`}
										style={{ marginTop: '10px' }}
										onMouseEnter={() => handleMouseEnter(1)}
										onMouseLeave={handleMouseLeave}
									>
										<p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed
											group-hover:text-gray-800 dark:group-hover:text-white
											transition-all duration-300">{t('about.story.paragraph2')}</p>
									</div>
								</div>
								
								{/* Panel 3 */}
								<div className="relative pl-16">
									<div 
										className="absolute left-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg" 
										style={{ 
											top: '10px'
										}}>
										<Rocket className="w-5 h-5 text-white" />
									</div>
									<div 
										className={`group bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-5 border-l-4 border-blue-500 shadow-md cursor-pointer
											transition-all duration-300 
											hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40
											hover:-translate-y-2 hover:shadow-xl hover:scale-105 
											hover:shadow-blue-400/40 dark:hover:shadow-blue-400/40
											hover:border-blue-400 ${
												isManualHover ? 
													(manualHoverIndex === 2 ? 'from-blue-100 to-blue-200 dark:from-blue-800/40 dark:to-blue-700/40 -translate-y-2 shadow-xl scale-105 shadow-blue-400/40 dark:shadow-blue-400/40 border-blue-400' : '') :
													(autoHoverIndex === 2 ? 'from-blue-100 to-blue-200 dark:from-blue-800/40 dark:to-blue-700/40 -translate-y-2 shadow-xl scale-105 shadow-blue-400/40 dark:shadow-blue-400/40 border-blue-400' : '')
											}`}
										style={{ marginTop: '10px' }}
										onMouseEnter={() => handleMouseEnter(2)}
										onMouseLeave={handleMouseLeave}
									>
										<p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed
											group-hover:text-gray-800 dark:group-hover:text-white
											transition-all duration-300">{t('about.story.paragraph3')}</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="relative flex justify-center">
						<div className="w-full max-w-md h-[568px] rounded-2xl overflow-hidden shadow-xl bg-gray-900">
							<video className="w-full h-full object-cover" autoPlay loop muted playsInline>
								<source
									src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos//Abouts_Us_Video.mp4"
									type="video/mp4"
								/>
								Tu navegador no soporta el elemento de video.
							</video>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUs
