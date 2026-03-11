import { useCallback, useMemo } from 'react'
import MuiSingleSelectFieldWithoutControl from './inputs/MuiSingleSelectFieldWithoutControl'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import Flag from 'react-world-flags'
import { MenuItem } from '@mui/material'

const LanguageSelector = ({ options = {}, controllerExtraclasses = {} }) => {
	const { lng = 'en' } = useParams()
	const { t } = useTranslation(lng, 'common')
	const pathname = usePathname()
	const router = useRouter()

	const languageList = useMemo(() => {
		return [
			{ _id: 'es', name: t('es'), code: 'es' },
			{ _id: 'en', name: t('en'), code: 'us' }
		]
	}, [t])

	const getLanguage = useCallback(
		id => {
			return languageList.find(i => i?._id === id)
		},
		[languageList]
	)

	const renderedList = useMemo(() => {
		return languageList.map(item => (
			<MenuItem key={item?._id} value={item?._id} sx={{ gap: '5px' }}>
				<Flag code={getLanguage(item?._id)?.code} height={20} width={25} /> {item?.name}
			</MenuItem>
		))
	}, [getLanguage, languageList])

	const onChange = useCallback(
		v => {
			const value = v?.target?.value
			const splittedPath = pathname?.split('/')

			if (getLanguage(splittedPath?.[1])) {
				const path = splittedPath?.[2] ?? ''
				router.push(`/${value}/${path}`)
			}
		},
		[getLanguage, pathname, router]
	)

	return (
		<MuiSingleSelectFieldWithoutControl
			fieldName={'language'}
			state={lng}
			setState={onChange}
			list={languageList}
			renderedList={renderedList}
			extraclasses={controllerExtraclasses}
			options={{
				sx: styles.selector,
				renderValue: v => <Flag code={getLanguage(v)?.code} height={20} width={25} />,
				...options
			}}
		/>
	)
}

export default LanguageSelector

const styles = {
	selector: {
		width: '60px',
		cursor: 'pointer',
		'& :hover': { opacity: 0.7 },
		'& fieldset': { border: 'none' },
		'& .MuiSelect-select': {
			padding: '0px',
			alignItems: 'center',
			display: 'flex'
		}
	}
}
