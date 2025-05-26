import React, { createContext, useState, ReactNode } from 'react'
import { Moon, Sun, Bell, Code2, Home, PieChart, Calendar as CalendarIcon, Settings, LogOut, Menu } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import EyeTrackingComponent from './RobotTraking'

interface ThemeContextProps {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	const toggleTheme = () => {
		setTheme((prev) => {
			const next = prev === 'light' ? 'dark' : 'light'
			if (next === 'dark') {
				document.documentElement.classList.add('dark')
			} else {
				document.documentElement.classList.remove('dark')
			}
			return next
		})
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

const Dashboard: React.FC = () => {
	const { isDark, setIsDark } = useDarkMode()
	const { user } = useUser()

	const toggleDarkMode = () => {
		setIsDark(!isDark)
	}

	return (
		<div className="flex h-screen bg-gradient-to-br from-[#3A71EC] via-[#6C5CEC] to-[#9949EC] dark:from-[#2F2E7B] dark:via-[#412982] dark:to-[#511F80] transition-colors duration-300">
			{/* ASIDEBAR */}
			<aside className="bg-white/80 dark:bg-gray-900/80 flex flex-col justify-between h-screen py-8 px-5 gap-4 w-64 border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-300">
				<div className="flex flex-col items-start gap-6">
					<div className="flex justify-center items-center gap-3 mb-5">
						<Code2 className="size-8" />
						<p className="text-2xl font-bold">
							Solware
							{/* <span className="text-sx right-10 ml-1 font-light">Business</span> */}
						</p>
					</div>
					<div className="flex justify-center items-center gap-3 cursor-pointer text-blue-500 border-l border-blue-500 pl-2 transition">
						<Home className="stroke-2 size-5" />
						<p className="text-md">Inicio</p>
					</div>
					<div className="flex justify-center items-center gap-3 cursor-pointer pl-2 hover:text-blue-500 transition">
						<PieChart className="stroke-2 size-5" />
						<p className="text-md">Estadisticas</p>
					</div>
					<div className="flex justify-center items-center gap-3 cursor-pointer pl-2 hover:text-blue-500 transition">
						<CalendarIcon className="stroke-2 size-5" />
						<p className="text-md">Calendario</p>
					</div>
				</div>
				<div className="flex items-center gap-3 cursor-pointer pl-2 hover:text-blue-500 transition">
					<Settings className="stroke-2 size-5" />
					<p className="text-md">Configuraciones</p>
				</div>
			</aside>

			{/* MAIN CONTENT */}
			<div className="flex flex-col flex-1 h-screen overflow-hidden">
				{/* HEADER */}
				<div className="bg-white/80 dark:bg-gray-900/80 rounded-bl-xl transition-colors duration-300 ml-5">
					<header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
						<form className="w-96">
							<label
								htmlFor="default-search"
								className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
							>
								Search
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
									<svg
										className="w-4 h-4 text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 20"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
										/>
									</svg>
								</div>
								<input
									type="search"
									id="default-search"
									className="block w-full p-2 ps-10 text-sm text-gray-200 border border-gray-500 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800"
									placeholder="Buscar..."
									required
								/>
							</div>
						</form>

						<div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
							<a href="#" className="text-sm hover:dark:text-white cursor-pointer">
								December, 12
							</a>
							<button
								onClick={toggleDarkMode}
								className="p-2 transition-colors hover:dark:text-white"
								aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
							>
								{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
							</button>
							<button className="p-2 transition-colors hover:dark:text-white">
								<Bell className="w-5 h-5" />
							</button>
							<div className="flex items-center gap-4">
								<UserButton afterSignOutUrl="/" />
								<Link to="/" className="p-2 transition-colors hover:dark:text-white">
									<LogOut className="w-5 h-5" />
								</Link>
							</div>
						</div>
					</header>
				</div>

				{/* MAIN */}
				<main className="flex-1 overflow-auto grid grid-cols-3 grid-rows-3 gap-5 m-5">
					{/* CONTENEDOR DE SOLWY */}
					<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl col-span-2 py-4 px-6 transition-colors duration-300 grid grid-cols-3 justify-between">
						<div className="flex flex-col justify-around col-span-2">
							<div>
								<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
									Bienvenido a Solware, {user?.firstName || 'Usuario'}!
								</h1>
								<p>Recuerda revisar los proyectos pendientes y el calendario</p>
							</div>
							<div className="flex gap-4">
								<button className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition">
									Nuevo Proyecto
								</button>
								<button className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition">
									Nueva Tarea
								</button>
							</div>
						</div>
						<EyeTrackingComponent
							className={
								'size-36 drop-shadow-[0px_0px_10px_rgba(0,0,0,0.5)] dark:drop-shadow-[0px_0px_10px_rgba(225,225,225,0.5)] transition duration-300'
							}
						/>
					</div>
					<div className="grid col-span-1 row-span-3 gap-5">
						{/* CONTENEDOR DEL CALENDARIO */}
						<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl py-4 px-6 transition-colors duration-300"></div>
						<div className="grid row-span-1 grid-rows-3 gap-5">
							{/* CONTENEDOR DE TAREAS */}
							<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl row-span-2 py-4 px-6 transition-colors duration-300"></div>
							{/* CONTENEDOR DE MIEMBROS */}
							<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl py-4 px-6 transition-colors duration-300"></div>
						</div>
					</div>
					{/* CONTENEDOR DE STATS */}
					<div className="grid grid-cols-2 col-span-2 gap-5">
						<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl py-4 px-8 flex flex-col justify-center items-center gap-5 transition-colors duration-300">
							<header className="flex justify-between w-full">
								<p className="text-lg font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300">
									<span className="bg-gray-500/20 dark:bg-white/20 p-1 px-2 rounded-lg mr-2 transition-colors duration-300">
										6
									</span>
									/26
								</p>
								<button>
									<Menu className="text-gray-700 dark:text-gray-300 transition-colors duration-300" />
								</button>
							</header>
							<div className="flex justify-between w-full items-center">
								<p className="text-2xl font-medium max-w-36 text-gray-700 dark:text-gray-300 transition-colors duration-300">
									Proyectos en progreso
								</p>
								<div className="relative size-24">
									<svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
										{/* <!-- Background Circle --> */}
										<circle
											cx="18"
											cy="18"
											r="16"
											fill="none"
											className="stroke-current text-gray-400/70 dark:text-gray-200 transition-colors duration-300"
											stroke-width="4"
										></circle>
										{/* <!-- Progress Circle --> */}
										<circle
											cx="18"
											cy="18"
											r="16"
											fill="none"
											className="stroke-current text-purple-600"
											stroke-width="4"
											stroke-dasharray="100"
											stroke-dashoffset="87"
											stroke-linecap="round"
										></circle>
									</svg>

									{/* <!-- Percentage Text --> */}
									<div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
										<span className="text-center text-2xl font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300">
											23%
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white/80 dark:bg-gray-900/80 rounded-xl py-4 px-8 flex flex-col justify-center items-center gap-5 transition-colors duration-300">
							<header className="flex justify-between w-full">
								<p className="text-lg font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300">
									<span className="bg-gray-500/20 dark:bg-white/20 p-1 px-2 rounded-lg mr-2 transition-colors duration-300">
										15
									</span>
									/26
								</p>
								<button>
									<Menu className="text-gray-700 dark:text-gray-300 transition-colors duration-300" />
								</button>
							</header>
							<div className="flex justify-between w-full items-center">
								<p className="text-2xl font-medium max-w-36 text-gray-700 dark:text-gray-300 transition-colors duration-300">
									Proyectos completados
								</p>
								<div className="relative size-24">
									<svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
										{/* <!-- Background Circle --> */}
										<circle
											cx="18"
											cy="18"
											r="16"
											fill="none"
											className="stroke-current text-gray-400/70 dark:text-gray-200 transition-colors duration-300"
											stroke-width="4"
										></circle>
										{/* <!-- Progress Circle --> */}
										<circle
											cx="18"
											cy="18"
											r="16"
											fill="none"
											className="stroke-current text-blue-500"
											stroke-width="4"
											stroke-dasharray="100"
											stroke-dashoffset="48"
											stroke-linecap="round"
										></circle>
									</svg>

									{/* <!-- Percentage Text --> */}
									<div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
										<span className="text-center text-2xl font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300">
											58%
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* CONTENEDOR DEL DIAGRAMA */}
					<div className="col-span-2 bg-white/80 dark:bg-gray-900/80 rounded-xl py-4 px-6 transition-colors duration-300"></div>
				</main>
			</div>
		</div>
	)
}

export default function DashboardWrapper() {
	return (
		<ThemeProvider>
			<Dashboard />
		</ThemeProvider>
	)
}
