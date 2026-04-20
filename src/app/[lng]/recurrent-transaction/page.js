import { fetchWithAuth } from '@/utils/fetchWithAuth'
import RecurrentTransaction from './RecurrentTransactionList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/recurrent-transactions')

	return <RecurrentTransaction initialItems={data ?? []} error={error} lng={params.lng} />
}
