import { useTranslation } from '@/hooks/useTranslation'
import { Box, Typography } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const DatalistToolbar = ({ title, onChange, value }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'common')

	const someProps = useMemo(() => {
		const temp = {}
		if (onChange) temp['onChange'] = onChange

		if (value) temp['value'] = value

		return temp
	}, [onChange, value])

	return (
		<Box sx={styles.topSection}>
			<Typography sx={{ flex: 1 }}>{title}</Typography>
			<Box sx={{ display: 'flex', gap: '25px' }}>
				<GridToolbarQuickFilter
					variant="outlined"
					size="small"
					sx={styles.gridToolbarQuickFilter}
					autoFocus
					placeholder={t('search')}
					{...someProps}
				/>
			</Box>
		</Box>
	)
}

export default DatalistToolbar

const styles = {
	topSection: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		mb: '15px'
	},

	gridToolbarQuickFilter: {
		backgroundColor: '#fff',
		paddingBottom: 'unset !important'
	}
}
