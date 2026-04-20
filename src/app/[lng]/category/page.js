import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Category from './CategoryList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/categories')

	return <Category initialItems={data ?? []} error={error} lng={params.lng} />
}
