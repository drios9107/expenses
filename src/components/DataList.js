import { Box, Paper, Typography } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import MuiTextfieldWithoutControl from './inputs/MuiTextFieldWithoutControl'
import { DataGrid } from '@mui/x-data-grid'

const DataList = ({ model = 'category', title = '', rows = [], columns, datagridOptions = {}, children }) => {
    const [searchValue, setSearchValue] = useState();

    const validate = useCallback((text = "") => {
        return text?.toString()?.toLowerCase().includes(searchValue?.toString()?.toLowerCase());
    }, [searchValue]);

    const filteredRows = useMemo(() => {
        if (searchValue && searchValue !== "")
            return rows.filter((item) => {
                if (model === 'category')
                    return validate(item?.name)
                // else if (model === 'transaction')
                //     return validate(item?.category?.name)
            });
        return rows;
    }, [model, rows, searchValue, validate]);

    return <Paper sx={styles.container}>
        <Box sx={styles.topSection}>
            <Typography sx={{ flex: 1 }}>{title}</Typography>
            <Box sx={{ display: 'flex', gap: '25px' }}>
                {children}
                <MuiTextfieldWithoutControl state={searchValue} setState={setSearchValue} fieldName={'search'} options={{ placeholder: 'Search' }} />
            </Box>
        </Box>
        <DataGrid
            getRowId={row => row?.id ?? row?.uid ?? row?._id}
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 20, 50]}
            sx={styles.datagrid}
            rowHeight={50}
            disableRowSelectionOnClick
            isRowSelectable={false}
            autoHeight
            // slots={{ toolbar: }}
            {...datagridOptions}
        />
    </Paper>
}

export default DataList

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', p: '25px', borderRadius: '16px' },
    topSection: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    datagrid: { border: 0, minHeight: '300px', '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' } },
}