import { useTranslation } from '@/hooks/useTranslation'
import { iconCellStyles } from '@/utils/helpers'
import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useParams } from 'next/navigation'

const ActionHeader = ({ onClick = () => {} }) => {
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'common')

	return (
		<Tooltip title={t('create')}>
			<IconButton onClick={onClick}>
				<Add sx={iconCellStyles} />
			</IconButton>
		</Tooltip>
	)
}

export default ActionHeader

const styles = {
	actionsContainer: {
		display: 'flex',
		gap: 0,
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%'
	},
	iconButton: { p: 0, height: '28px', width: '28px' }
}
