import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Users from './UserList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/users')

	return <Users initialItems={data ?? []} error={error} lng={params.lng} />
}
