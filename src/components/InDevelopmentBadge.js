import { Error } from '@mui/icons-material'
import { Chip } from '@mui/material'

const InDevelopmentBadge = ({ isOnlyTop = false }) => {
	return (
		<Chip
			sx={isOnlyTop ? styles.isOnlyTop : styles.chip}
			label="In Development"
			color="error"
			variant="outlined"
			icon={<Error fontSize="small" />}
		/>
	)
}

export default InDevelopmentBadge

const styles = {
	chip: { position: 'absolute', top: '10px', right: '10px', fontWeight: 'bold' },
	isOnlyTop: { position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }
}
