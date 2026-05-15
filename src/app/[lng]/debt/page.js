import { fetchWithAuth } from '@/utils/fetchWithAuth'
import Debts from './DebtList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/debts')
	console.log('***debts', params)

	return <Debts initialItems={data ?? []} error={error} lng={params.lng} />
}
