import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DatalistToolbar from './DatalistToolbar'

const DataList = ({ title = '', rows = [], columns, ...datagridOptions }) => {
	return (
		<Paper sx={[styles.container, styles.pageContainer]}>
			<DataGrid
				getRowId={row => row?.id ?? row?.uid ?? row?._id}
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
				pageSizeOptions={[10, 20, 50, 100]}
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
	)
}

export default DataList

const styles = {
	container: { p: '25px', borderRadius: '16px' },
	datagrid: {
		border: 0,
		minHeight: '300px',
		'& .MuiDataGrid-cell': { display: 'flex', alignItems: 'center' },
		'& .MuiDataGrid-columnHeaders': {
			backgroundColor: '#f0f4ff',
			borderTop: '1px solid #c4d2e8',
			borderBottom: '1px solid #c4d2e8',
			color: '#2c4671'
		}
	},
	pageContainer: {
		background: 'linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%)'
	}
}
