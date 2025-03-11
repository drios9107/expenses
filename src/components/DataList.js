import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import DatalistToolbar from './DatalistToolbar'

const DataList = ({ model = 'category', title = '', rows = [], columns, datagridOptions = {}, children }) => {
    return <Paper sx={styles.container}>
        <DataGrid
            getRowId={row => row?.id ?? row?.uid ?? row?._id}
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[10, 20, 50]}
            sx={styles.datagrid}
            rowHeight={50}
            disableRowSelectionOnClick
            isRowSelectable={false}
            autoHeight
            slots={{ toolbar: DatalistToolbar }}
            slotProps={{ toolbar: { title } }}
            {...datagridOptions}
        />
    </Paper>
}

export default DataList

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: 'calc(100vw - 75px)', p: '25px', borderRadius: '16px' },
    datagrid: { border: 0, minHeight: '300px', '& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' } },
}