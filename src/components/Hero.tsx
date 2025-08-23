import React, { useState, useEffect } from 'react'
import { ArrowRight, Zap, Shield, Clock, Play, BarChart3, Bot, Paintbrush } from 'lucide-react'
import { Link } from 'react-router-dom'
import Particles from './Particles'
import DecryptedText from './effectsComponents/DecryptedText'
import { useTranslation } from 'react-i18next'

export default function Hero() {
	const { t, i18n } = useTranslation()
	const [isPreloadFinished, setIsPreloadFinished] = useState(false)

	useEffect(() => {
		// Simulate preload animation ending
		const preloadTimer = setTimeout(() => {
			setIsPreloadFinished(true)
		}, 3000) // Adjust the time to match your preload animation duration

		return () => clearTimeout(preloadTimer)
	}, [])

	return (
		<div className="relative min-h-[100svh] flex items-center" id="inicio">
			{/* Background with gradient overlay and animated particles */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 dark:from-indigo-900/90 dark:to-purple-900/90 overflow-hidden">
				<div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />

				{/* Animated particles - ahora usando las partículas memorizadas */}
				<Particles />
			</div>

			{/* Hero content */}
			<div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					<div className="text-center lg:text-left">
						<DecryptedText
							key={`hero-title-${i18n.language}`} // Fuerza re-render cuando cambia el idioma
							text={t('hero.title')}
							speed={50}
							className="revealed text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white dark:text-blue-100 
              mb-12 sm:mb-15 lg:mb-24 animate-fade-in leading-tight sm:leading-tight"
							animateOn={isPreloadFinished ? 'view' : 'hover'}
							revealDirection="start"
							sequential={true}
						/>

						<p
							className="text-lg sm:text-xl text-white/90 dark:text-blue-200 mb-6 sm:mb-8 animate-fade-in-delay 
              [text-shadow:_0_1px_5px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_0_15px_rgba(147,197,253,0.3)]
              max-w-2xl mx-auto lg:mx-0 pt-6 sm:pt-8 lg:pt-10"
						>
							{t('hero.subtitle')}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-2">
							<a
								href="https://calendar.app.google/EYruMbWpJwJ82gHr6"
								target="_blank"
								className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold 
                  hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl
                  transform hover:-translate-y-0.5 active:translate-y-0"
							>
								{t('header.consulta')}
							</a>

							<Link
								to="/demo"
								className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold 
                  hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl
                  transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
							>
								<Play className="h-5 w-5 mr-2" />
								{t('hero.demo')}
							</Link>
						</div>
					</div>

					<div className="hidden lg:block">
						<div
							className="bg-white/10 dark:bg-blue-900/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 
              shadow-2xl dark:shadow-blue-500/20 animate-fade-in-delay 
              hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_40px_rgba(96,165,250,0.3)]
              transition-all duration-500"
						>
							<div className="grid grid-cols-2 gap-4 sm:gap-6">
								{[
									{
										icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
										title: t('hero.automation'),
										label: t('hero.efficiency'),
										hoverColor: 'group-hover:text-yellow-400 dark:group-hover:text-yellow-300',
										glowColor: 'dark:group-hover:shadow-[0_0_15px_rgba(250,204,21,0.5)]',
									},
									{
										icon: <Paintbrush className="h-6 w-6 sm:h-8 sm:w-8" />,
										title: t('hero.security'),
										label: t('hero.activeTime'),
										hoverColor: 'group-hover:text-green-400 dark:group-hover:text-green-300',
										glowColor: 'dark:group-hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]',
									},
									{
										icon: <Bot className="h-6 w-6 sm:h-8 sm:w-8" />,
										title: t('hero.savings'),
										label: t('hero.costs'),
										hoverColor: 'group-hover:text-orange-400 dark:group-hover:text-orange-300',
										glowColor: 'dark:group-hover:shadow-[0_0_15px_rgba(251,146,60,0.5)]',
									},
									{
										icon: <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" />,
										title: t('hero.scalability'),
										label: t('hero.limits'),
										hoverColor: 'group-hover:text-blue-400 dark:group-hover:text-blue-300',
										glowColor: 'dark:group-hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]',
									},
								].map((stat, index) => (
									<div
										key={index}
										className="group text-center p-3 sm:p-4 rounded-xl bg-white/5 dark:bg-blue-900/30 
                      hover:bg-white/10 dark:hover:bg-blue-800/40 
                      transform hover:-translate-y-1 transition-all duration-300
                      hover:shadow-lg hover:shadow-white/10 dark:hover:shadow-blue-500/20"
									>
										<div
											className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
                      rounded-lg bg-white/10 dark:bg-blue-800/50 mb-2 sm:mb-3 transform group-hover:scale-110 
                      transition-all duration-300 group-hover:rotate-3 ${stat.glowColor}`}
										>
											{React.cloneElement(stat.icon, {
												className: `transition-colors duration-300 ${stat.hoverColor} text-white`,
											})}
										</div>
										<h3
											className="text-base sm:text-lg font-medium text-white dark:text-blue-100 mb-1 
                      transition-colors duration-300 group-hover:text-white/90"
										>
											{stat.title}
										</h3>
										<p
											className="text-sm sm:text-base text-white/80 dark:text-blue-200/80 
                      transition-colors duration-300 group-hover:text-white/90 font-medium"
										>
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}