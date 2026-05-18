import { Tooltip, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const HeaderLink = ({ page, title, children }) => {
	const isMobile = useMediaQuery('@media (max-width:500px)')
	const { lng } = useParams()

	return (
		<Link href={`/${lng}/${page}`} className="landing-page-link" style={styles.link}>
			{isMobile ? (
				<Tooltip title={title}>{children}</Tooltip>
			) : (
				<>
					{children} {title}
				</>
			)}
		</Link>
	)
}

export default HeaderLink

const styles = {
	link: {
		display: 'flex',
		flexDirection: 'row',
		gap: '6px',
		alignItems: 'center',
		color: '#2c4671',
		fontWeight: 500,
		padding: '6px 10px',
		borderRadius: '10px',
		transition: 'all 0.2s ease'
	}
}
