import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Persons from './PersonList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/persons')

	return <Persons initialItems={data ?? []} error={error} lng={params.lng} />
}
