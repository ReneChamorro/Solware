import { Settings, Code2, Check } from 'lucide-react'
import React, { useMemo, useEffect, useState } from 'react'
import RobotEyeTracking from './RoboTrakChat'
import BlurText from './BlurText'

const PricingParticles = React.memo(
	({
		lightColor = '#e5e7eb',
		darkColor = '#222E3D',
		className,
	}: {
		lightColor?: string
		darkColor?: string
		className?: string
	}) => {
		const [isDark, setIsDark] = useState(false)

		useEffect(() => {
			const checkTheme = () => {
				setIsDark(document.documentElement.classList.contains('dark'))
			}

			checkTheme()

			const observer = new MutationObserver(checkTheme)
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class'],
			})

			return () => observer.disconnect()
		}, [])

		const bubbles = useMemo(
			() =>
				Array.from({ length: 60 }, (_, i) => ({
					id: i,
					size: `${2 + Math.random() * 0.5}rem`,
					distance: `${6 + Math.random() * 50}rem`,
					position: `${-5 + Math.random() * 110}%`,
					time: `${2 + Math.random() * 8}s`,
					delay: `${-1 * (2 + Math.random() * 8)}s`,
				})),
			[],
		)

		const currentColor = isDark ? darkColor : lightColor
		const filterId = useMemo(() => `blob-${currentColor.replace('#', '')}`, [currentColor])

		return (
			<>
				<style>{`
        @keyframes bubble-size {
          0%, 75% {
            width: var(--size);
            height: var(--size);
          }
          100% {
            width: 0rem;
            height: 0rem;
          }
        }
        @keyframes bubble-move {
          0% {
            bottom: -4rem;
          }
          100% {
            bottom: var(--distance);
          }
        }
        .bubble {
          position: absolute;
          left: var(--position);
          background: var(--color);
          border-radius: 100%;
          animation: bubble-size var(--time) ease-in infinite var(--delay),
                     bubble-move var(--time) ease-in infinite var(--delay);
          transform: translate(-50%, 100%);
          width: var(--size);
          height: var(--size);
          transition: background-color 0.3s ease;
        }
      `}</style>
				<div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
					<svg className="absolute" style={{ position: 'fixed', top: '100vh' }}>
						<defs>
							<filter id={filterId}>
								<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
								<feColorMatrix
									in="blur"
									mode="matrix"
									values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
									result="blob"
								/>
							</filter>
						</defs>
					</svg>
					<div className="absolute inset-0" style={{ filter: `url(#${filterId})` }}>
						{bubbles.map((bubble) => (
							<div
								key={bubble.id}
								className="bubble"
								style={
									{
										'--size': bubble.size,
										'--distance': bubble.distance,
										'--position': bubble.position,
										'--time': bubble.time,
										'--delay': bubble.delay,
										'--color': currentColor,
									} as React.CSSProperties & { [key: string]: string }
								}
							/>
						))}
					</div>
				</div>
			</>
		)
	},
)

export default function Pricing() {
	const pricingData = [
		{
			id: 1,
			icon: <Settings className="size-20 text-white group-hover:rotate-90 transition-all duration-700 ease-in-out" />,
			title: 'Automatización de Procesos',
			advantage1: 'Flujos de Trabajo Automatizados.',
			advantage2: 'Reportes Automatizados.',
			advantage3: 'Diagnóstico Inteligente.',
			color: '#3b82f6',
		},
		{
			id: 2,
			icon: <RobotEyeTracking className="size-32 text-white" />,
			title: 'Agentes IA',
			advantage1: 'Asistentes Virtuales.',
			advantage2: 'Automatización Inteligente.',
			advantage3: 'Soporte Multicanal Inteligente',
			color: '',
		},
		{
			id: 3,
			icon: <Code2 className="size-20 text-white group-hover:rotate-180 transition-all duration-700 ease-in-out" />,
			title: 'Desarrollo Web y Móvil',
			advantage1: 'Diseño UX/UI Intuitivo.',
			advantage2: 'Desarrollo Full-Stack.',
			advantage3: 'Optimización SEO',
			color: '#3b82f6',
		},
	]

	return (
		<section id="pricing" className="py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<BlurText
					text="Pricing"
					delay={150}
					animateBy="words"
					direction="top"
					className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 sm:text-2xl md:text-3xl lg:text-4xl"
				/>
				<BlurText
					text="Explora nuestros planes de precios adaptados a tus necesidades."
					delay={200}
					animateBy="words"
					direction="bottom"
					className="text-lg text-gray-600 dark:text-gray-300 mb-16 sm:text-base md:text-lg lg:text-xl"
				/>
				<PricingParticles lightColor="#e5e7eb" darkColor="#222E3D" className="z[-1] hidden lg:block" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{pricingData.map((plan) => (
						<div
							key={plan.id}
							className="group transform hover:scale-105 drop-shadow-[0px_0px_3px_rgba(29,78,216,0.5)] hover:drop-shadow-[0px_0px_10px_rgba(29,78,216,0.5)] transition duration-300 border border-[rgb(29,78,216)] rounded-2xl cursor-pointer flex flex-col"
						>
							<div className="relative bg-gray-50 dark:bg-gray-700 p-16 text-center flex flex-col items-center justify-center rounded-t-2xl h-48 flex-shrink-0">
								<div
									className="rounded-full z-50 p-5 drop-shadow-[0px_0px_3px_rgba(29,78,216,0.5)] group-hover:drop-shadow-[0px_0px_10px_rgba(29,78,216,0.8)] transition duration-300"
									style={{ backgroundColor: plan.color }}
								>
									{plan.icon}
								</div>
							</div>
							<div className="bg-gray-100 dark:bg-gray-800 pb-12 pt-8 px-12 text-center rounded-b-2xl shadow-[inset_0_0px_20px_-10px_rgba(29,78,216,0.5),inset_0_-0px_20px_-10px_rgba(29,78,216,0.5)] group-hover:shadow-[inset_0_10px_20px_-8px_rgba(29,78,216,0.7),inset_0_-10px_20px_-8px_rgba(29,78,216,0.7)] transition-shadow duration-300 flex-1">
								<div className="z-10 flex flex-col">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{plan.title}</h3>
									<div className="flex flex-col items-start">
										<p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-3 justify-start w-full text-sm sm:text-sm">
											<Check className="size-4 text-green-400" />{' '}
											<span className="font-bold text-center ">{plan.advantage1}</span>
										</p>
										<p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-3 justify-start w-full text-sm sm:text-sm">
											<Check className="size-4 text-green-400" />{' '}
											<span className="font-bold text-center ">{plan.advantage2}</span>
										</p>
										<p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-3 justify-start w-full text-sm sm:text-sm">
											<Check className="size-4 text-green-400" />{' '}
											<span className="font-bold text-center ">{plan.advantage3}</span>
										</p>
									</div>
									<a href="#contacto">
										<button className="mt-4 px-4 py-2 text-white rounded hover:opacity-90 bg-[#3b82f6] hover:scale-105 transition-all text-sm sm:text-base md:text-lg">
											Cotizar
										</button>
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}