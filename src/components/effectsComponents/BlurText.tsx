import { motion, Transition } from 'framer-motion'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'

type BlurTextProps = {
	text?: string
	delay?: number
	className?: string
	animateBy?: 'words' | 'letters'
	direction?: 'top' | 'bottom'
	threshold?: number
	rootMargin?: string
	animationFrom?: Record<string, string | number>
	animationTo?: Array<Record<string, string | number>>
	easing?: (t: number) => number
	onAnimationComplete?: () => void
	stepDuration?: number
}

// Memoizar la función de construcción de keyframes
const buildKeyframes = (
	from: Record<string, string | number>,
	steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
	const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])

	const keyframes: Record<string, Array<string | number>> = {}
	keys.forEach((k) => {
		keyframes[k] = [from[k], ...steps.map((s) => s[k])]
	})
	return keyframes
}

const BlurText: React.FC<BlurTextProps> = ({
	text = '',
	delay = 200,
	className = '',
	animateBy = 'words',
	direction = 'top',
	threshold = 0.1,
	rootMargin = '0px',
	animationFrom,
	animationTo,
	easing = (t) => t,
	onAnimationComplete,
	stepDuration = 0.35,
}) => {
	const [inView, setInView] = useState(false)
	const ref = useRef<HTMLParagraphElement>(null)

	// Memoizar valores por defecto
	const defaultFrom = useMemo(() => {
		return direction === 'top'
			? { filter: 'blur(10px)', opacity: 0, y: -50 }
			: { filter: 'blur(10px)', opacity: 0, y: 50 }
	}, [direction])

	const defaultTo = useMemo(() => {
		return [
			{
				filter: 'blur(5px)',
				opacity: 0.5,
				y: direction === 'top' ? 5 : -5,
			},
			{ filter: 'blur(0px)', opacity: 1, y: 0 },
		]
	}, [direction])

	const fromSnapshot = animationFrom ?? defaultFrom
	const toSnapshots = animationTo ?? defaultTo

	// Memoizar elementos
	const elements = useMemo(() => {
		return animateBy === 'words' ? text.split(' ') : text.split('')
	}, [text, animateBy])

	// Memoizar valores de animación
	const stepCount = toSnapshots.length + 1
	const totalDuration = stepDuration * (stepCount - 1)
	const times = useMemo(() => {
		return Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)))
	}, [stepCount])

	// Memoizar keyframes para evitar recálculos
	const animateKeyframes = useMemo(() => {
		return buildKeyframes(fromSnapshot, toSnapshots)
	}, [fromSnapshot, toSnapshots])

	// Callback memoizado para intersection observer
	const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
		if (entry.isIntersecting) {
			setInView(true)
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [])

	// Crear observer una sola vez
	const observer = useMemo(() => {
		return new IntersectionObserver(handleIntersection, { threshold, rootMargin })
	}, [handleIntersection, threshold, rootMargin])

	useEffect(() => {
		if (!ref.current) return
		
		observer.observe(ref.current)
		
		return () => {
			observer.disconnect()
		}
	}, [observer])

	// Memoizar el callback de animación completa
	const handleAnimationComplete = useCallback(() => {
		onAnimationComplete?.()
	}, [onAnimationComplete])

	return (
		<p ref={ref} className={`blur-text ${className} flex flex-wrap justify-center`}>
			{elements.map((segment, index) => {
				// Precalcular transition para cada elemento
				const spanTransition: Transition = {
					duration: totalDuration,
					times,
					delay: (index * delay) / 1000,
					ease: easing,
				}

				return (
					<motion.span
						key={`${segment}-${index}`} // Key más específico para mejor reconciliación
						initial={fromSnapshot}
						animate={inView ? animateKeyframes : fromSnapshot}
						transition={spanTransition}
						onAnimationComplete={index === elements.length - 1 ? handleAnimationComplete : undefined}
						style={{
							display: 'inline-block',
							willChange: inView ? 'transform, filter, opacity' : 'auto', // Optimización de willChange
						}}
					>
						{segment === ' ' ? '\u00A0' : segment}
						{animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
					</motion.span>
				)
			})}
		</p>
	)
}

export default BlurText