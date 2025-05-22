import { UserButton, useUser } from '@clerk/clerk-react'

export default function UserProfile() {
	const { isLoaded, isSignedIn, user } = useUser()

	if (!isLoaded) {
		return <div>Cargando...</div>
	}

	if (!isSignedIn) {
		return (
			<div className="flex items-center gap-4">
				<UserButton afterSignOutUrl="/" />
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<UserButton afterSignOutUrl="/" />
			<div className="text-center">
				<h2 className="text-xl font-bold">Bienvenido, {user.firstName}!</h2>
				<p className="text-gray-600 dark:text-gray-400">{user.emailAddresses[0].emailAddress}</p>
			</div>
		</div>
	)
}
