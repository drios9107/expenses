import { fetchWithAuth } from '@/utils/fetchWithAuth'
import DefaultTransactionValue from './DefaultTransactionValueList'

export default async function Page({ params }) {
	const { data, error } = await fetchWithAuth('/default-transaction-values')

	return <DefaultTransactionValue initialItems={data ?? []} error={error} lng={params.lng} />
}
