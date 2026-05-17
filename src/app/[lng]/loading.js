'use client'

import { Box, CircularProgress } from '@mui/material'

const LoadingPage = () => {
	return (
		<Box sx={styles.container}>
			<CircularProgress />
		</Box>
	)
}

export default LoadingPage

const styles = {
	container: { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }
}
