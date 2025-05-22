import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import {
	Search,
	Moon,
	Plus,
	Bell,
	Code2,
	Home,
	PieChart,
	Calendar,
	Settings,
	List as ListIcon,
	Grid as GridIcon,
	MoreVertical,
	Star,
	XCircle,
	MessageCircle,
	Plus as PlusMini,
} from 'lucide-react'
import { UserButton } from '@clerk/clerk-react'

/**
 * Theme Context – global para que puedas reutilizarlo en otras pantallas.
 */
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

const useTheme = () => {
	const ctx = useContext(ThemeContext)
	if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
	return ctx
}

/**
 * Modelos TypeScript
 */
export interface Project {
	id: string
	title: string
	subtitle: string
	date: string
	progress: number // 0–100
	color: string // tailwind text color e.g. "text-orange-500"
	bgColor: string // tailwind bg color e.g. "bg-[#fee4cb]"
	barColor: string // width + bg
	participants: string[] // urls
	daysLeft: number
}

export interface Message {
	id: string
	senderName: string
	avatar: string
	content: string
	time: string
	starred: boolean
}

/**
 * DATA MOCK (puedes reemplazar por API)
 */
const mockProjects: Project[] = [
	{
		id: '1',
		title: 'Web Designing',
		subtitle: 'Prototyping',
		date: '2020-12-10',
		progress: 60,
		color: 'text-orange-500',
		bgColor: 'bg-[#fee4cb]',
		barColor: 'bg-orange-500',
		participants: [
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2550&q=80',
			'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=900&q=60',
		],
		daysLeft: 2,
	},
	// ...añade los demás
]

const mockMessages: Message[] = [
	{
		id: 'm1',
		senderName: 'Stephanie',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=2550&q=80',
		content: 'I got your first assignment. It was quite good. 🥳 We can continue with the next assignment.',
		time: 'Dec, 12',
		starred: false,
	},
	// ...
]

/**
 * COMPONENTE PRINCIPAL
 */

const Dashboard: React.FC = () => {
	const { toggleTheme } = useTheme()
	const [view, setView] = useState<'grid' | 'list'>('grid')
	const [messagesOpen, setMessagesOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="w-full h-screen flex flex-col bg-app-container dark:bg-app-container-dark max-w-[1800px] mx-auto">
			{/* Header */}
			<header className="flex items-center justify-between px-6 py-4">
				{/* LEFT */}
				<div className="flex items-center gap-8">
					<p className="text-main-color dark:text-main-color-dark text-2xl font-bold flex items-center">
						<Code2 className="size-7 mr-3" />
						Solware <span className="text-xs right-10 ml-1">Business</span>
					</p>
					{/* Search */}
					<div className="flex items-center w-full max-w-md h-10 rounded-full shadow-md dark:shadow-none bg-search-area-bg dark:bg-search-area-bg-dark overflow-hidden">
						<input
							type="text"
							placeholder="Search"
							className="flex-1 px-5 h-full text-base bg-search-area-bg dark:bg-search-area-bg-dark text-main-color dark:text-main-color-dark placeholder:opacity-60 outline-none"
						/>
						<Search className="mr-3 w-5 h-5 text-light-font dark:text-light-font-dark" />
					</div>
				</div>

				{/* RIGHT */}
				<div className="flex items-center gap-2">
					<button
						onClick={toggleTheme}
						title="Switch Theme"
						className="flex items-center justify-center w-8 h-8 text-main-color dark:text-main-color-dark"
					>
						<Moon className="w-5 h-5" />
					</button>
					<button
						title="Add New Project"
						className="flex items-center justify-center w-8 h-8 rounded-full bg-button-bg text-white"
					>
						<Plus className="w-4 h-4" strokeWidth={3} />
					</button>
					<button className="flex items-center justify-center w-8 h-8 text-main-color dark:text-main-color-dark">
						<Bell className="w-5 h-5" />
					</button>
					<div className="flex items-center gap-1 pl-3 border-l border-gray-200 dark:border-white/10">
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</header>

			{/* CONTENT */}
			<main className="flex flex-1 overflow-hidden px-6 pb-6">
				{/* Sidebar */}
				<aside className="hidden md:flex flex-col items-center py-10 gap-4">
					<SidebarLink Icon={Home} active />
					<SidebarLink Icon={PieChart} />
					<SidebarLink Icon={Calendar} />
					<SidebarLink Icon={Settings} />
				</aside>

				{/* Projects section */}
				<section className="flex flex-col flex-1 bg-projects-section dark:bg-projects-section-dark rounded-3xl p-8 overflow-hidden">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<p className="text-main-color dark:text-main-color-dark text-2xl font-bold">Projects</p>
						<p className="text-main-color dark:text-main-color-dark text-xl opacity-90">December, 12</p>
					</div>

					{/* Status line */}
					<div className="flex justify-between items-center mb-8">
						<div className="flex gap-4 flex-wrap">
							<Status number={45} label="In Progress" />
							<Status number={24} label="Upcoming" />
							<Status number={62} label="Total Projects" />
						</div>
						<div className="flex items-center gap-2">
							<ViewButton Icon={ListIcon} active={view === 'list'} onClick={() => setView('list')} />
							<ViewButton Icon={GridIcon} active={view === 'grid'} onClick={() => setView('grid')} />
						</div>
					</div>

					{/* Projects */}
					<div className={`overflow-y-auto -mx-2 flex flex-wrap ${view === 'grid' ? '' : 'flex-col'}`}>
						{mockProjects.map((p) => (
							<ProjectBox key={p.id} project={p} view={view} />
						))}
					</div>
				</section>

				{/* Messages toggle btn */}
				<button
					onClick={() => setMessagesOpen(true)}
					className="md:hidden absolute right-0 top-14 bg-message-btn dark:bg-message-btn-dark text-main-color dark:text-main-color-dark p-1 rounded-l"
				>
					<MessageCircle className="w-5 h-5" />
				</button>

				{/* Messages section */}
				<section
					className={`${
						{
							true: 'translate-x-0 opacity-100 ml-6',
							false: 'translate-x-full opacity-0 ml-6 md:ml-6',
						}[messagesOpen.toString()]
					} transform transition-all duration-300 md:static md:translate-x-0 md:opacity-100 md:flex md:flex-col md:flex-shrink-0 md:w-1/3 bg-projects-section dark:bg-projects-section-dark rounded-3xl overflow-auto`}
				>
					{/* Close btn */}
					<button
						onClick={() => setMessagesOpen(false)}
						className="md:hidden absolute top-3 right-3 text-main-color dark:text-main-color-dark"
					>
						<XCircle className="w-6 h-6" />
					</button>

					<div className="sticky top-0 z-10 bg-projects-section dark:bg-projects-section-dark pt-8 px-6">
						<p className="text-main-color dark:text-main-color-dark text-2xl font-bold">Client Messages</p>
					</div>

					<div>
						{mockMessages.map((m) => (
							<MessageBox key={m.id} message={m} />
						))}
					</div>
				</section>
			</main>
		</div>
	)
}

/** SUB‑COMPONENTES */
const SidebarLink: React.FC<{ Icon: React.ComponentType<any>; active?: boolean }> = ({ Icon, active }) => (
	<button
		className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
			active
				? 'bg-link-color-active-bg text-link-color-active'
				: 'text-link-color hover:bg-link-color-hover hover:text-link-color-active'
		}`}
	>
		<Icon className="w-5 h-5" />
	</button>
)

const Status: React.FC<{ number: number; label: string }> = ({ number, label }) => (
	<div className="flex flex-col mr-4">
		<span className="text-2xl font-bold text-main-color dark:text-main-color-dark">{number}</span>
		<span className="text-secondary-color dark:text-secondary-color-dark relative pr-6 after:content-[''] after:absolute after:top-1/2 after:right-2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:border after:border-secondary-color last:after:hidden">
			{label}
		</span>
	</div>
)

const ViewButton: React.FC<{
	Icon: React.ComponentType<any>
	active: boolean
	onClick: () => void
}> = ({ Icon, active, onClick }) => (
	<button
		onClick={onClick}
		className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${
			active
				? 'bg-link-color-active-bg text-link-color-active'
				: 'text-main-color dark:text-main-color-dark hover:bg-link-color-hover hover:text-link-color-active'
		}`}
	>
		<Icon className="w-5 h-5" />
	</button>
)

const ProjectBox: React.FC<{ project: Project; view: 'grid' | 'list' }> = ({ project, view }) => (
	<div className={`${view === 'grid' ? 'w-1/3' : 'w-full'} p-2`}>
		<div
			className={`rounded-3xl p-4 ${project.bgColor} flex flex-col ${
				view === 'list' ? 'md:flex-row md:items-start md:gap-6' : ''
			}`}
		>
			{/* Header */}
			<div className="flex justify-between items-start mb-4 flex-shrink-0">
				<span className="text-sm text-gray-700 opacity-70">{project.date}</span>
				<button className="text-main-color">
					<MoreVertical className="w-5 h-5" />
				</button>
			</div>

			{/* Content header */}
			<div className="text-center md:text-left md:max-w-[120px] flex-shrink-0 md:order-1">
				<p className="text-lg font-bold opacity-70 mb-0.5">{project.title}</p>
				<p className="text-sm opacity-70">{project.subtitle}</p>
			</div>

			{/* Progress */}
			<div className="flex-1 md:order-3">
				<p className="text-sm font-bold">Progress</p>
				<div className="bg-white h-1 rounded mb-2 overflow-hidden">
					<span className={`block h-1 rounded ${project.barColor}`} style={{ width: `${project.progress}%` }} />
				</div>
				<p className="text-sm font-bold text-right">{project.progress}%</p>
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center pt-4 relative md:order-4 w-full">
				<div className="flex items-center -space-x-2">
					{project.participants.map((src, idx) => (
						<img key={idx} src={src} className="w-5 h-5 rounded-full object-cover border-2 border-white" />
					))}
					<button className={`w-5 h-5 flex items-center justify-center rounded-full bg-white ml-2 ${project.barColor}`}>
						<PlusMini className="w-3 h-3 text-white" strokeWidth={3} />
					</button>
				</div>
				<div className={`text-xs font-bold px-4 py-1 rounded-full bg-white bg-opacity-60 ${project.color}`}>
					{project.daysLeft} Days Left
				</div>
			</div>
		</div>
	</div>
)

const MessageBox: React.FC<{ message: Message }> = ({ message }) => (
	<div className="flex items-start w-full border-t border-message-box-border dark:border-message-box-border-dark p-4 hover:bg-message-box-hover dark:hover:bg-message-box-hover-dark gap-4">
		<img src={message.avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
		<div className="flex-1">
			<div className="flex justify-between items-center">
				<p className="text-base font-bold text-main-color dark:text-main-color-dark mb-0">{message.senderName}</p>
				<label className="flex items-center cursor-pointer">
					<input type="checkbox" className="sr-only" checked={message.starred} readOnly />
					<Star
						className={`w-5 h-5 ${
							message.starred ? 'fill-star text-star' : 'text-secondary-color dark:text-secondary-color-dark'
						}`}
					/>
				</label>
			</div>
			<p className="text-sm text-secondary-color dark:text-secondary-color-dark opacity-70 my-2">{message.content}</p>
			<p className="text-xs text-right text-secondary-color dark:text-secondary-color-dark opacity-70">
				{message.time}
			</p>
		</div>
	</div>
)

/**
 * EXPORT
 */
export default function DashboardWrapper() {
	return (
		<ThemeProvider>
			<Dashboard />
		</ThemeProvider>
	)
}

/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * TAILWIND CONFIG – ejemplo (agrega en tailwind.config.js)
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  theme: {
 *    extend: {
 *      colors: {
 *        "app-container": "#f3f6fd",
 *        "app-container-dark": "#111827",
 *        "main-color": "#1f1c2e",
 *        "main-color-dark": "#ffffff",
 *        "secondary-color": "#4A4A4A",
 *        "secondary-color-dark": "rgba(255,255,255,.8)",
 *        "link-color": "#1f1c2e",
 *        "link-color-hover": "#c3cff4",
 *        "link-color-active": "#ffffff",
 *        "link-color-active-bg": "#1f1c2e",
 *        "projects-section": "#ffffff",
 *        "projects-section-dark": "#1f2937",
 *        "search-area-bg": "#ffffff",
 *        "search-area-bg-dark": "#1f2937",
 *        "button-bg": "#1f1c24",
 *        "message-box-hover": "#fafcff",
 *        "message-box-hover-dark": "#243244",
 *        "message-box-border": "#e9ebf0",
 *        "message-box-border-dark": "rgba(255,255,255,.1)",
 *        star: "#ffd92c",
 *        "message-btn": "#ffffff",
 *        "message-btn-dark": "rgba(195,207,244,0.1)",
 *      },
 *    },
 *  },
 */
