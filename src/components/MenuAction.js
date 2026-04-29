import { IconButton, Tooltip, Typography } from '@mui/material'

const MenuAction = ({ onClick, collapsed, title, children }) => {
	return (
		<Tooltip title={collapsed ? title : ''} placement="right" arrow>
			<IconButton onClick={onClick} sx={collapsed ? styles.collapsedItem : styles.item}>
				{collapsed ? (
					children
				) : (
					<>
						{children}
						<Typography sx={styles.menuText}>{title}</Typography>
					</>
				)}
			</IconButton>
		</Tooltip>
	)
}

export default MenuAction

const styles = {
	item: {
		display: 'flex',
		gap: '12px',
		alignItems: 'center',
		justifyContent: 'flex-start',
		width: 'calc(100% - 16px)',
		height: '42px',
		borderRadius: '12px',
		mx: '8px',
		px: '10px',
		color: '#2c4671',
		'&:hover': {
			backgroundColor: '#edf3ff',
			transform: 'translateX(2px)'
		},
		transition: 'all 0.2s ease'
	},
	collapsedItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '42px',
		height: '42px',
		borderRadius: '12px',
		color: '#2c4671',
		'&:hover': {
			backgroundColor: '#edf3ff'
		}
	},
	menuText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		color: '#2c4671',
		fontWeight: 500
	}
}
