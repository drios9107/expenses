import { useCallback, useEffect, useState } from 'react'
import DataList from './DataList'
import { useSearch } from '@/hooks'
import DatalistToolbar from './DatalistToolbar'
import useDebounce from '@/hooks/useDebounce'

const DataListAdvancedSearch = ({
	rows = [],
	setRows = () => {},
	model = 'transactions',
	title = '',
	columns,
	filters,
	refreshKey = 0,
	...datagridOptions
}) => {
	const [page, setPage] = useState(0)
	const { advancedSearch, isLoading } = useSearch()

	const [searchTerm, setSearchTerm] = useState()
	const searchTermDebounced = useDebounce(searchTerm, 500)
	const [rowCount, setRowCount] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [paginationToken, setPaginationToken] = useState()
	const [sortField, setSortField] = useState('date')
	const [sortDirection, setSortDirection] = useState('desc')

	const fetchData = useCallback(
		async (params = {}) => {
			const payload = {
				searchTerm: searchTermDebounced,
				limit: pageSize,
				sortField,
				sortDirection,
				...filters,
				...params
			}
			const response = await advancedSearch(model, payload)
			if (response) {
				if (response?.data) setRows(response?.data)
				if (response?.nextPageToken || response?.previousPageToken)
					setPaginationToken({
						previousPageToken: response.previousPageToken,
						nextPageToken: response.nextPageToken
					})
				if (response?.total) setRowCount(response?.total)
			}
		},
		[advancedSearch, filters, model, pageSize, searchTermDebounced, setRows, sortDirection, sortField]
	)

	const onPaginationModelChange = useCallback(
		async model => {
			const payload = {}
			if (model?.pageSize !== pageSize) {
				setPageSize(model.pageSize)
				setPage(0)
			}

			if (model?.page !== page) {
				setPage(model.page)
				payload.paginationToken =
					model?.page < page
						? {
								...paginationToken.previousPageToken,
								direction: 'previous'
							}
						: {
								...paginationToken.nextPageToken,
								direction: 'next'
							}
			}

			fetchData(payload)
		},
		[fetchData, page, pageSize, paginationToken]
	)

	const onSortModelChange = useCallback(async _sortModel => {
		if (_sortModel?.length >= 0) {
			setSortDirection(_sortModel[0].sort)
			setSortField(_sortModel[0].field)
		}
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData, refreshKey])

	return (
		<DataList
			title={title}
			columns={columns}
			rows={rows}
			disableColumnFilter
			paginationMode="server"
			sortingMode="server"
			filterMode="server"
			onSortModelChange={onSortModelChange}
			paginationModel={{ page, pageSize }}
			onPaginationModelChange={onPaginationModelChange}
			rowCount={rowCount}
			slots={{
				toolbar: props => (
					<DatalistToolbar {...props} onChange={v => setSearchTerm(v?.target?.value)} value={searchTerm} />
				)
			}}
			{...datagridOptions}
		/>
	)
}

export default DataListAdvancedSearch
