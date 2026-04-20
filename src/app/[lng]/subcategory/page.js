import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Subcategory from './SubcategoryList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/subcategories')

	return <Subcategory initialItems={data ?? []} error={error} lng={params.lng} />
}
