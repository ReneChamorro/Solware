import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useOrganization, useUser } from '@clerk/clerk-react'

interface AddItemModalProps {
	isOpen: boolean
	onClose: () => void
	type: 'task' | 'project'
	onSubmit: (data: {
		title: string
		description: string
		assignedTo?: string
		priority: 'low' | 'medium' | 'high'
	}) => void
}

interface OrganizationMember {
	userId: string
	firstName: string
	lastName: string
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, type, onSubmit }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [assignedTo, setAssignedTo] = useState('')
	const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
	const [members, setMembers] = useState<OrganizationMember[]>([])
	const { user } = useUser()
	const { organization } = useOrganization()

	useEffect(() => {
		const loadMembers = async () => {
			try {
				if (organization) {
					// Obtener todos los miembros de la organización
					const memberships = await organization.getMemberships()
					const memberList = memberships.map((membership) => ({
						userId: membership.publicUserData?.userId || '',
						firstName: membership.publicUserData?.firstName || '',
						lastName: membership.publicUserData?.lastName || '',
					}))
					setMembers(memberList)
				}
			} catch (error) {
				console.error('Error al cargar usuarios:', error)
			}
		}
		loadMembers()
	}, [organization])

	if (!isOpen) return null

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({
			title,
			description,
			assignedTo,
			priority,
		})
		setTitle('')
		setDescription('')
		setAssignedTo('')
		setPriority('medium')
		onClose()
	}

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleBackdropClick}>
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
						{type === 'task' ? 'Nueva Tarea' : 'Nuevo Proyecto'}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						<X size={24} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Título
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
							required
						/>
					</div>

					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Descripción
						</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
							rows={3}
							required
						/>
					</div>

					<div>
						<label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Asignar a
						</label>
						<select
							id="assignedTo"
							value={assignedTo}
							onChange={(e) => setAssignedTo(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
						>
							<option value="">Todos los miembros</option>
							<option value="me">Yo mismo</option>
							{members
								.filter((member) => member.userId !== user?.id)
								.map((member) => (
									<option key={member.userId} value={member.userId}>
										{member.firstName} {member.lastName}
									</option>
								))}
						</select>
					</div>

					<div>
						<label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Prioridad
						</label>
						<select
							id="priority"
							value={priority}
							onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
						>
							<option value="low">Baja</option>
							<option value="medium">Media</option>
							<option value="high">Alta</option>
						</select>
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
						>
							{type === 'task' ? 'Crear Tarea' : 'Crear Proyecto'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddItemModal
