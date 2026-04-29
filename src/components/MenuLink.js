import { IconButton, MenuItem, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'

const MenuLink = ({ href, title = '', collapsed, children }) => {
	return (
		<Link href={href} passHref>
			{collapsed ? (
				<Tooltip title={title} placement="right" arrow>
					<IconButton sx={styles.collapsedItem}>{children}</IconButton>
				</Tooltip>
			) : (
				<MenuItem sx={styles.item}>
					{children}
					<Typography sx={styles.menuText}>{title}</Typography>
				</MenuItem>
			)}
		</Link>
	)
}

export default MenuLink

const styles = {
	item: {
		display: 'flex',
		gap: '12px',
		alignItems: 'center',
		justifyContent: 'flex-start',
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
