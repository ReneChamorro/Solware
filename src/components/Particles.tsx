import React from 'react'


function Particles() {
	const particles = [...Array(20)].map((_, i) => (
		<div
			key={i}
			className="particle absolute rounded-full bg-white/20 dark:bg-blue-400/30 animate-float"
			style={{
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				width: `${Math.random() * 10 + 5}px`,
				height: `${Math.random() * 10 + 5}px`,
				animationDelay: `${Math.random() * 5}s`,
				animationDuration: `${Math.random() * 10 + 10}s`,
			}}
		/>
	))

	return <div className="particles absolute inset-0">{particles}</div>
}

export default React.memo(Particles)
