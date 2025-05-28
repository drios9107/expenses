import { useCallback, useEffect, useState } from 'react';
import DataList from './DataList';
import { useSearch } from '@/hooks';

const DataListAdvancedSearch = ({ model = 'transactions', title = '', columns, ...datagridOptions }) => {
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([]);
    const { advancedSearch, isLoading } = useSearch();

    const [searchTerm, setSearchTerm] = useState();
    const [rowCount, setRowCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [paginationToken, setPaginationToken] = useState();
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [isExpense, setIsExpense] = useState();
    const [isRecurrent, setIsRecurrent] = useState();

    const fetchData = useCallback(async (params = {}) => {
        console.log('***params', {
            searchTerm,
            limit: pageSize,
            sortField,
            sortDirection,
            isExpense,
            isRecurrent,
            ...params
        })
        const response = await advancedSearch(model, {
            searchTerm,
            limit: pageSize,
            sortField,
            sortDirection,
            isExpense,
            isRecurrent,
            ...params
        });
        if (response) {
            console.log('***response', response)
            if (response?.data)
                setRows(response?.data)
            if (response?.nextPageToken || response?.previousPageToken)
                setPaginationToken({ previousPageToken: response.previousPageToken, nextPageToken: response.nextPageToken })
            if (response?.total)
                setRowCount(response?.total)
        }
    }, [advancedSearch, isExpense, isRecurrent, model, pageSize, searchTerm, sortDirection, sortField])

    const onPaginationModelChange = useCallback(async (model) => {
        console.log('***new pagination model', model)
        const payload = {};
        if (model?.pageSize !== pageSize) {
            setPageSize(model.pageSize);
            setPage(0);
        }

        if (model?.page !== page) {
            setPage(model.page);
            payload.paginationToken = model?.page < page ?
                {
                    ...paginationToken.previousPageToken,
                    direction: 'previous'
                } :
                {
                    ...paginationToken.nextPageToken,
                    direction: 'next'
                };
        }

        fetchData(payload);
    }, [fetchData, page, pageSize, paginationToken])

    const onSortModelChange = useCallback(async _sortModel => {
        if (_sortModel?.length >= 0) {
            setSortDirection(_sortModel[0].sort);
            setSortField(_sortModel[0].field);
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])


    return <DataList
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
        rowCount={rowCount ?? rows?.length}
        {...datagridOptions}
    />
}

export default DataListAdvancedSearch

