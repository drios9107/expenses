import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Roles from './RoleList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/roles')

	return <Roles initialItems={data ?? []} error={error} lng={params.lng} />
}
