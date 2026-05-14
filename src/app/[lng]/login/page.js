'use client'
import MuiTextfield from '@/components/inputs/MuiTextField'
import Loader from '@/components/Loader'
import { useTranslation } from '@/hooks/useTranslation'
import { fadeInStyles } from '@/utils/helpers'
import { messages } from '@/utils/messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { GitHub, Google } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { Eye, EyeOff } from 'mdi-material-ui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { en, es } from 'yup-locales'

const defaultValues = {
	email: '',
	password: ''
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(7, 'Password must be at least 7 characters')
})

const Login = ({ params }) => {
	const { t } = useTranslation(params?.lng, 'login')
	const [show, setShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		yup.setLocale(params?.lng === 'en' ? en : es)
	}, [params?.lng])

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid }
	} = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(schema) })

	const onSubmit = useCallback(data => {
		setIsLoading(true)
		signIn('credentials', { ...data, redirect: false })
			.then(res => {
				if (res?.error) toast.error(messages[res.error])
			})
			.finally(() => setIsLoading(false))
	}, [])

	const callProvider = useCallback(provider => {
		signIn(provider, { callbackUrl: '/', redirect: false }).catch(err => {
			console.error('Social login error', err)
			toast.error(err?.message ?? 'Login failed')
		})
	}, [])

	const onKeyDown = useCallback(
		e => {
			if (e?.key === 'Enter') handleSubmit(onSubmit)()
		},
		[handleSubmit, onSubmit]
	)

	const getEndAdornment = useMemo(() => {
		const icon = show ? <EyeOff fontSize="small" /> : <Eye fontSize="small" />
		return (
			<IconButton size="small" onClick={() => setShow(prev => !prev)}>
				{icon}
			</IconButton>
		)
	}, [show])

	return (
		<Box sx={styles.pageWrapper}>
			<Paper sx={styles.card} elevation={8}>
				<Box sx={styles.header}>
					<Typography variant="h4" sx={styles.title}>
						{t('login.welcomeBack')}
					</Typography>
					<Typography variant="body2" sx={styles.subtitle}>
						{t('login.loginDescription')}
					</Typography>
				</Box>

				<Box sx={styles.formArea}>
					<MuiTextfield
						control={control}
						errors={errors}
						fieldName="email"
						options={{ label: t('login.email'), type: 'email', onKeyDown }}
					/>
					<MuiTextfield
						control={control}
						errors={errors}
						fieldName="password"
						options={{
							label: t('login.password'),
							type: show ? 'text' : 'password',
							onKeyDown,
							endAdornment: getEndAdornment
						}}
					/>

					<Button
						fullWidth
						variant="contained"
						size="large"
						onClick={handleSubmit(onSubmit)}
						disabled={!isDirty || !isValid}
					>
						{t('login.login')}
					</Button>
				</Box>

				<Box sx={styles.bottomRow}>
					<Link href={`/${params?.lng}/`}>
						<Typography variant="body2" sx={styles.backText}>
							{t('login.back')}
						</Typography>
					</Link>
				</Box>

				<Divider sx={styles.divider} />
				<Typography variant="body2" sx={styles.orText}>
					{t('login.orContinueWith') || 'Continue with'}
				</Typography>
				<Box sx={styles.providersContainer}>
					<Tooltip title="GitHub">
						<IconButton sx={styles.providerButton} onClick={() => callProvider('github')}>
							<GitHub sx={styles.providerIcon} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Google">
						<IconButton sx={styles.providerButton} onClick={() => callProvider('google')}>
							<Google sx={styles.providerIcon} />
						</IconButton>
					</Tooltip>
				</Box>
				{isLoading && <Loader loading />}
			</Paper>
		</Box>
	)
}

export default Login

const styles = {
	pageWrapper: {
		width: '100%',
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		p: '20px',
		background: 'linear-gradient(180deg, #eef4ff 0%, #dfe8ff 40%, #b6c8ff 100%)'
	},
	card: {
		width: '100%',
		maxWidth: '430px',
		borderRadius: '28px',
		p: { xs: '28px', sm: '34px' },
		boxShadow: '0 30px 80px rgba(39, 99, 223, 0.18)',
		background: 'rgba(255,255,255,0.94)',
		backdropFilter: 'blur(14px)'
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
		mb: '28px'
	},
	title: {
		fontWeight: 700,
		color: '#1d3557'
	},
	subtitle: {
		color: '#40507a',
		letterSpacing: '0.01em'
	},
	formArea: {
		display: 'grid',
		gap: '18px',
		mb: '22px'
	},
	bottomRow: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: '10px',
		mb: '18px'
	},
	helperText: {
		color: '#5a6e96'
	},
	backText: {
		color: '#2c4671',
		fontWeight: 600
	},
	linkText: {
		color: '#2c4671',
		fontWeight: 600,
		ml: '6px'
	},
	divider: {
		my: '12px',
		borderColor: '#d8e2ff'
	},
	orText: {
		textAlign: 'center',
		color: '#5a6e96',
		mb: '14px'
	},
	providersContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '14px'
	},
	providerButton: {
		border: '1px solid #d8e2ff',
		backgroundColor: '#fff',
		color: '#2c4671',
		'&:hover': {
			backgroundColor: '#eff4ff'
		}
	},
	providerIcon: {
		color: '#2c4671'
	}
}
