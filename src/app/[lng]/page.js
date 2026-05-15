'use client'
import banner from '@/assets/banner4.png'
import feature1 from '@/assets/feature1.png'
import feature2 from '@/assets/feature2.png'
import feature3 from '@/assets/feature3.png'
import feature4 from '@/assets/feature4.jpg'
import feature5 from '@/assets/feature5.jpg'
import feature6 from '@/assets/feature6.png'
import feature7 from '@/assets/feature7.png'
import feature8 from '@/assets/feature8.jpg'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { fadeInStyles } from '@/utils/helpers'
import { useTranslation } from '@/hooks/useTranslation'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import LanguageSelector from '@/components/LanguageSelector'

export default function Home({ params }) {
	const { status } = useSession()
	const { t } = useTranslation(params?.lng ?? 'en', 'landing')
	const lng = useMemo(() => params?.lng ?? 'en', [params?.lng])
	const router = useRouter()
	const [visibleFeatures, setVisibleFeatures] = useState([])

	const isInvalidRoute = useMemo(() => !params.lng || !['en', 'es'].includes(params?.lng), [params?.lng])

	useEffect(() => {
		if (isInvalidRoute) return router.replace('/en')
	}, [isInvalidRoute, router])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute('data-feature-id')
						setVisibleFeatures(prev => [...new Set([...prev, id])])
					}
				})
			},
			{ threshold: 0.3 }
		)

		const featureElements = document.querySelectorAll('[data-feature-id]')
		featureElements.forEach(el => observer.observe(el))

		return () => observer.disconnect()
	}, [])

	if (isInvalidRoute) return null

	const features = [
		{ id: '1', title: t('feature1'), image: feature1.src },
		{ id: '2', title: t('feature2'), image: feature2.src },
		{ id: '3', title: t('feature3'), image: feature3.src },
		{ id: '4', title: t('feature4'), image: feature4.src },
		{ id: '5', title: t('feature5'), image: feature5.src },
		{ id: '6', title: t('feature6'), image: feature6.src },
		{ id: '7', title: t('feature7'), image: feature7.src },
		{ id: '8', title: t('feature8'), image: feature8.src }
	]

	return (
		<Box sx={styles.container}>
			{/* Hero Section */}
			<Box sx={styles.hero}>
				<Box sx={styles.heroOverlay}>
					<Box sx={styles.heroNav}>
						<LanguageSelector controllerExtraclasses={{ width: 'fit-content' }} />
					</Box>
					<Box sx={styles.heroContent}>
						<Typography variant="h3" sx={styles.heroTitle}>
							{t('title')}
						</Typography>
						<Typography variant="h6" sx={styles.heroSubtitle}>
							{t('subtitle')}
						</Typography>
						<Box sx={styles.heroButtons}>
							{status !== 'authenticated' ? (
								<Link href={`/${params?.lng}/login`} style={styles.linkButton}>
									<Button variant="contained" size="large" sx={styles.ctaButton}>
										{t('loginNow')}
									</Button>
								</Link>
							) : (
								<Link href={`/${params?.lng}/dashboard`} style={styles.linkButton}>
									<Button variant="contained" size="large" sx={styles.ctaButton}>
										{t('get_started')}
									</Button>
								</Link>
							)}
						</Box>
					</Box>
				</Box>
			</Box>

			{/* Features Section */}
			<Box sx={styles.featuresSection}>
				<Box sx={styles.featuresGrid}>
					{features.map((feature, index) => (
						<Card
							key={feature.id}
							data-feature-id={feature.id}
							sx={{
								...styles.featureCard,
								...(visibleFeatures.includes(feature.id)
									? styles.featureCardVisible
									: styles.featureCardHidden)
							}}
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							<CardMedia
								component="img"
								height="200"
								image={feature.image}
								alt={feature.title}
								sx={styles.featureImage}
							/>
							<CardContent sx={styles.featureContent}>
								<Typography variant="h6" sx={styles.featureTitle}>
									{feature.title}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Box>
			</Box>

			{/* Footer */}
			<Box sx={styles.footer}>
				<Typography variant="body2" color="#fff">
					&copy; {new Date().getFullYear()} Expenses. {t('allRightsReserved')}
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
					<Link href={`/${lng}/privacy`} variant="body2" underline="hover">
						{t('privacyPolicy')}
					</Link>
					<Link href={`/${lng}/terms`} variant="body2" underline="hover">
						{t('termsOfService')}
					</Link>
					<Link href={`/${lng}/cookies`} variant="body2" underline="hover">
						{t('cookiePolicy')}
					</Link>
				</Box>
			</Box>
		</Box>
	)
}

const styles = {
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	hero: {
		height: '100vh',
		backgroundImage: `url(${banner.src})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	heroOverlay: {
		position: 'relative',
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	heroContent: {
		textAlign: 'center',
		color: '#fff',
		maxWidth: '900px',
		px: 3,
		...fadeInStyles()
	},
	heroTitle: {
		mb: 2,
		fontWeight: 700,
		textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
	},
	heroSubtitle: {
		mb: 4,
		fontWeight: 400,
		textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
	},
	heroButtons: {
		display: 'flex',
		gap: 2,
		justifyContent: 'center'
	},
	ctaButton: {
		borderRadius: '50px',
		px: 4,
		py: 1.5,
		fontSize: '1.1rem',
		fontWeight: 600,
		backgroundColor: '#4f8ef8',
		'&:hover': {
			backgroundColor: '#294B7A'
		}
	},
	featuresSection: {
		py: 8,
		px: 3,
		backgroundColor: '#f8f9fa',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	featuresGrid: {
		display: 'grid',
		gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
		gap: 4,
		maxWidth: '1200px',
		width: '100%'
	},
	featureCard: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderRadius: '16px',
		boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
		transition: 'transform 0.3s ease, box-shadow 0.3s ease',
		'&:hover': {
			transform: 'translateY(-8px)',
			boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
		}
	},
	featureCardHidden: {
		opacity: 0,
		transform: 'translateY(50px)',
		transition: 'opacity 0.6s ease, transform 0.6s ease'
	},
	featureCardVisible: {
		opacity: 1,
		transform: 'translateY(0)',
		transition: 'opacity 0.6s ease, transform 0.6s ease'
	},
	featureImage: {
		borderTopLeftRadius: '16px',
		borderTopRightRadius: '16px',
		borderBottom: '1px solid #e0e0e0'
	},
	heroNav: {
		position: 'absolute',
		top: 24,
		right: 24,
		zIndex: 2
	},
	featureContent: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		p: 2
	},
	featureTitle: {
		textAlign: 'center',
		color: '#2c4671',
		fontWeight: 600
	},
	footer: {
		backgroundColor: '#2c4671',
		height: '100px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#fff',
		px: '50px'
	},
	linkButton: {
		textDecoration: 'none'
	}
}
