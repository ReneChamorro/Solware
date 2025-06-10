import { memo, useEffect, useState } from 'react';

type Particle = {
	id: number
	text: string
	left: number
	animationDuration: number
	fontSize: number
	delay: number
	opacity: number
}

const PreloaderBinary = memo(() => {
	const [particles, setParticles] = useState<Particle[]>([])

	useEffect(() => {
		const generateParticles = () => {
			const newParticles = []
			const particleCount = 500

			for (let i = 0; i < particleCount; i++) {
				const binaryString = Array.from({ length: Math.floor(Math.random() * 10) + 3 }, () =>
					Math.random() > 0.5 ? '1' : '0',
				).join('')

				newParticles.push({
					id: i,
					text: binaryString,
					left: Math.random() * 100,
					animationDuration: Math.random() * 3 + 2, // 2-5 seconds
					fontSize: Math.random() * 8 + 12, // 12-20px
					delay: Math.random() * 3, // 0-3 seconds delay
					opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity
				})
			}

			setParticles(newParticles)
		}

		// Generar partículas inmediatamente sin delay
		generateParticles()

		// Regenerate particles periodically
		const interval = setInterval(() => {
			generateParticles()
		}, 10000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
			<style>{`
        @keyframes binaryFall {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 1000px));
            opacity: 0;
          }
        }
        .binary-particle {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          pointer-events: none;
          animation: binaryFall linear infinite;
          top: -50px;
          white-space: nowrap;
        }
      `}</style>
			{particles.map((particle) => (
				<div
					key={`${particle.id}-${Date.now()}`}
					className="binary-particle"
					style={{
						left: `${particle.left}%`,
						fontSize: `${particle.fontSize}px`,
						animationDuration: `${particle.animationDuration}s`,
						animationDelay: `${particle.delay}s`,
						color: `rgba(122, 20, 224, ${particle.opacity})`,
						textShadow: `0 0 8px rgba(75, 119, 188, ${particle.opacity * 0.8})`,
					}}
				>
					{particle.text}
				</div>
			))}
		</div>
	)
})

const Preloader = memo(() => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
			document.body.style.overflow = 'auto'
		}, 3000)

		document.body.style.overflow = 'hidden'

		return () => {
			clearTimeout(timer)
			document.body.style.overflow = 'auto'
		}
	}, [])

	if (!isLoading) return null

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
			<style>{`
        .loader {
          --size: 250px;
          --duration: 2s;
          --logo-color: #4B77BC;
          --background: linear-gradient(
            0deg,
            rgba(75, 119, 188, 0.2) 0%,
            rgba(106, 0, 255, 0.2) 100%
          );
          height: var(--size);
          aspect-ratio: 1;
          position: relative;
          margin-bottom: 2rem;
          z-index: 10;
        }

        .loader .box {
          position: absolute;
          background: var(--background);
          border-radius: 50%;
          border-top: 1px solid rgba(75, 119, 188, 1);
          box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
          backdrop-filter: blur(5px);
          animation: ripple var(--duration) infinite ease-in-out;
        }

        .loader .box:nth-child(1) {
          inset: 40%;
          z-index: 99;
        }

        .loader .box:nth-child(2) {
          inset: 30%;
          z-index: 98;
          border-color: rgba(75, 119, 188, 0.8);
          animation-delay: 0.2s;
        }

        .loader .box:nth-child(3) {
          inset: 20%;
          z-index: 97;
          border-color: rgba(75, 119, 188, 0.6);
          animation-delay: 0.4s;
        }

        .loader .box:nth-child(4) {
          inset: 10%;
          z-index: 96;
          border-color: rgba(75, 119, 188, 0.4);
          animation-delay: 0.6s;
        }

        .loader .box:nth-child(5) {
          inset: 0%;
          z-index: 95;
          border-color: rgba(75, 119, 188, 0.2);
          animation-delay: 0.8s;
        }

        .loader .logo {
          position: absolute;
          inset: 0;
          display: grid;
          place-content: center;
          padding: 5%;
        }

        .loader .logo svg {
          fill: var(--logo-color);
          width: 100%;
          animation: color-change var(--duration) infinite ease-in-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
          }
          50% {
            transform: scale(1.3);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px -0px;
          }
          100% {
            transform: scale(1);
            box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px -0px;
          }
        }

        @keyframes color-change {
          0% {
            fill: var(--logo-color);
          }
          50% {
            fill: white;
          }
          100% {
            fill: var(--logo-color);
          }
        }

        .animated-text {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin: 2rem 0;
          z-index: 10;
          position: relative;
        }

        .text-char {
          display: inline-block;
          font-size: 2.5rem;
          font-weight: bold;
          color: #4B77BC;
          text-shadow: 2px 2px 8px rgba(75, 119, 188, 0.3);
          animation: float-text 2s ease-in-out infinite;
          transform-origin: center;
        }

        .text-char:nth-child(2) { animation-delay: 0.1s; }
        .text-char:nth-child(3) { animation-delay: 0.2s; }
        .text-char:nth-child(4) { animation-delay: 0.3s; }
        .text-char:nth-child(5) { animation-delay: 0.4s; }
        .text-char:nth-child(6) { animation-delay: 0.5s; }
        .text-char:nth-child(7) { animation-delay: 0.6s; }

        @keyframes float-text {
          0%, 100% {
            transform: translateY(0) rotate(0);
            filter: brightness(1);
          }
          25% {
            transform: translateY(-8px) rotate(2deg);
            filter: brightness(1.2);
          }
          75% {
            transform: translateY(4px) rotate(-1deg);
            filter: brightness(0.9);
          }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-progress {
          animation: progress 3s ease-out;
        }
      `}</style>

			{/* Binary Rain Background - Se renderiza inmediatamente */}
			<PreloaderBinary />

			<div className="relative flex flex-col items-center">
				<div className="relative">
					<div className="loader">
						<div className="box">
							<div className="logo">
								<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 500 500">
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="M308.2 117c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3M66.1 249.6c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3m367 0c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3M158.5 302c2.1 2.2 4.1 4 4.4 4s-1.3-1.8-3.4-4-4.1-4-4.4-4 1.3 1.8 3.4 4m32.6 81.6c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3"
									/>
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="m109.5 200.2-29 29.3 29.3-29c16-15.9 29.2-29.1 29.2-29.2 0-.8-2.6 1.8-29.5 28.9m273.5-6.7c12.4 12.4 22.7 22.5 23 22.5s-9.6-10.1-22-22.5-22.7-22.5-23-22.5 9.6 10.1 22 22.5m-273 107c15.7 15.7 28.7 28.5 29 28.5s-12.3-12.8-28-28.5S82.3 272 82 272s12.3 12.8 28 28.5m276 3.2-25.5 25.8 25.8-25.5c23.9-23.7 26.2-26 25.4-26-.1 0-11.7 11.6-25.7 25.7"
									/>
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="M358.5 215c12.6 12.6 23.2 23 23.5 23s-9.9-10.4-22.5-23c-12.6-12.7-23.2-23-23.5-23s9.9 10.3 22.5 23m-218.5.7-22.5 22.8 22.8-22.5c21.1-20.9 23.2-23 22.4-23-.1 0-10.3 10.2-22.7 22.7m-25.6 25.5-1.9 2.3 2.3-1.9c2.1-1.8 2.7-2.6 1.9-2.6-.2 0-1.2 1-2.3 2.2m270.1-.2c1 1.1 2 2 2.3 2s-.3-.9-1.3-2-2-2-2.3-2 .3.9 1.3 2m-275.6 5.7-2.4 2.8 2.8-2.4c2.5-2.3 3.2-3.1 2.4-3.1-.2 0-1.4 1.2-2.8 2.7m281.6 0 2.9 3.3-2.9 3.2-3 3.3 3.5-3.3 3.5-3.2-3.5-3.3-3.5-3.2zM106 250.3c0 .2 1.5 1.6 3.3 3.3l3.2 2.9-2.9-3.3c-2.8-3-3.6-3.7-3.6-2.9m8.5 8.7c1 1.1 2 2 2.3 2s-.3-.9-1.3-2-2-2-2.3-2 .3.9 1.3 2m269.9.2-1.9 2.3 2.3-1.9c2.1-1.8 2.7-2.6 1.9-2.6-.2 0-1.2 1-2.3 2.2M140 284.5c12.4 12.4 22.7 22.5 23 22.5s-9.6-10.1-22-22.5-22.7-22.5-23-22.5 9.6 10.1 22 22.5m219 .2-22.5 22.8 22.8-22.5c21.1-20.9 23.2-23 22.4-23-.1 0-10.3 10.2-22.7 22.7"
									/>
									<path
										fill="#4080BF"
										d="M287.3 101.2c-4.7 1.2-10 7-11.6 12.5-.8 2.7-20 64.1-42.7 136.6-44.2 141.5-42.4 134.8-37.7 141.8 6.1 9 19.6 9.4 25.8.8 1.1-1.6 21.1-64.1 44.5-139 33.8-108.1 42.5-136.8 42-139.4-1.8-9.4-11.5-15.8-20.3-13.3m-143.8 67.7c-2.6 1.2-16.5 14.5-39.6 37.7-38.5 38.8-38 38.1-36.3 47.1.6 3.3 5.3 8.5 36.7 40 38.3 38.5 40.5 40.3 47.9 38.9 10.3-1.9 16.5-12.8 12.5-21.8-.7-1.6-14.2-15.8-30.1-31.8l-28.9-29 28.8-29c15.9-16 29.5-30 30.2-31.3 3.2-5.8.1-15.8-6.2-19.7-5-3.1-10.1-3.5-15-1.1m199.5.3c-7.5 3.8-11.3 14-7.7 20.6.7 1.2 14.3 15.3 30.2 31.2l28.9 29-29 29c-15.9 16-29.4 30.2-30.1 31.8-4 9 2.2 19.9 12.5 21.8 7.4 1.4 9.6-.4 47.9-38.9 33.5-33.6 36.1-36.5 36.8-40.4 1.4-8.5.9-9.2-36.9-47.1-34.7-34.9-39.8-39.2-45.7-39.2-1.4 0-4.5 1-6.9 2.2"
									/>
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="M417 227.5c6.3 6.3 11.7 11.5 12 11.5.2 0-4.7-5.2-11-11.5S406.3 216 406 216c-.2 0 4.7 5.2 11 11.5m-341.5 6.7-5 5.3 5.3-5c4.8-4.6 5.7-5.5 4.9-5.5-.1 0-2.5 2.4-5.2 5.2m.5 32.3c3 3 5.7 5.5 5.9 5.5.3 0-1.9-2.5-4.9-5.5s-5.7-5.5-5.9-5.5c-.3 0 1.9 2.5 4.9 5.5m344 3.2-8.5 8.8 8.8-8.5c4.8-4.6 8.7-8.6 8.7-8.7 0-.8-1.1.3-9 8.4"
									/>
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="M302 103.4c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3m-107 291c0 .2.8 1 1.8 1.7 1.5 1.3 1.6 1.2.3-.4s-2.1-2.1-2.1-1.3"
									/>
									<path
										fill="#4080BF"
										fillOpacity="1"
										d="M134 222.5 106.5 250l24.5 24.3 24.5 24.2-24-24.3-24-24.2 27.5-27.5c15.1-15.1 27.3-27.5 27-27.5s-12.9 12.4-28 27.5m231-.3 27.5 27.8-27.5 27.7-27.5 27.8 28-27.8 28-27.7-28-27.8-28-27.7z"
									/>
								</svg>
							</div>
						</div>
						<div className="box" />
						<div className="box" />
						<div className="box" />
						<div className="box" />
					</div>

					<div className="animated-text">
						{'SOLWARE'.split('').map((char, index) => (
							<span
								key={index}
								className="text-char"
								style={{
									animationDelay: `${index * 0.1}s`,
									textShadow: `0 0 10px rgba(75, 119, 188, ${0.3 + index * 0.1})`,
								}}
							>
								{char}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Preloader