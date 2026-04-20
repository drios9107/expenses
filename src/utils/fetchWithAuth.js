import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function fetchWithAuth(url, options = {}) {
	const session = await getServerSession(authOptions)
	const token = session?.user?.token

	let error = null
	let data = null

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
			...options,
			headers: {
				...(options.headers || {}),
				Authorization: `Bearer ${token}`
			},
			cache: 'no-store'
		})

		if (!res.ok) {
			const body = await res.json().catch(() => ({}))
			throw new Error(body?.error || `Backend error: ${res.status}`)
		}

		data = await res.json()
	} catch (err) {
		console.error('SSR fetchWithAuth error:', err)
		error = err.message
	}

	return { data: data.data, error }
}
