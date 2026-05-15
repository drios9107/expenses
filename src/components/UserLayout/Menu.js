import { Divider, Paper, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import MenuLink2 from '../MenuLink'
import {
	ArrowCircleRightOutlined,
	BackupOutlined,
	CategoryOutlined,
	CurrencyExchange,
	PaymentsOutlined,
	SecurityOutlined
} from '@mui/icons-material'
import { AccountOutline, BankOff, CurrencyUsd, Human, ToyBrickOutline } from 'mdi-material-ui'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { useSession } from 'next-auth/react'
import ContractMenuAction2 from '../ContractMenuAction2'
import MenuAction2 from '../MenuAction'
import ConversionCurrency from '../ConversionCurrency'
import { useDbBackup } from '@/hooks'

const Menu = () => {
	const { lng } = useParams()
	const { t } = useTranslation(lng ?? 'en', 'common')
	const isMobile = useMediaQuery('@media (max-width:640px)')
	const [collapsed, setCollapsed] = useState(false)
	const [openConvertCurrencyForm, setOpenConvertCurrencyForm] = useState(false)
	const { data: session } = useSession()
	const { saveDb } = useDbBackup()

	useEffect(() => {
		if (isMobile) setCollapsed(true)
	}, [isMobile])

	return (
		<Paper sx={collapsed ? [styles.menu, styles.collapsedMenu] : styles.menu}>
			<MenuLink2 href={`/${lng}/category`} title={t('category')} collapsed={collapsed}>
				<CategoryOutlined sx={styles.iconMenu} />
			</MenuLink2>

			<MenuLink2 href={`/${lng}/subcategory`} title={t('subCategory')} collapsed={collapsed}>
				<ToyBrickOutline sx={styles.iconMenu} />
			</MenuLink2>

			<MenuLink2 href={`/${lng}/transaction`} title={t('transaction')} collapsed={collapsed}>
				<PaymentsOutlined sx={styles.iconMenu} />
			</MenuLink2>

			<MenuLink2 href={`/${lng}/recurrent-transaction`} title={t('recurrentTransaction')} collapsed={collapsed}>
				<CurrencyExchange sx={styles.iconMenu} />
			</MenuLink2>

			<MenuLink2 href={`/${lng}/debt`} title={t('debts')} collapsed={collapsed}>
				<BankOff sx={styles.iconMenu} />
			</MenuLink2>

			<MenuAction2
				onClick={() => setOpenConvertCurrencyForm(!openConvertCurrencyForm)}
				collapsed={collapsed}
				title={t('convertCurrency')}
			>
				<CurrencyUsd sx={styles.iconMenu} />
			</MenuAction2>

			<MenuLink2 href={`/${lng}/person`} title={t('persons')} collapsed={collapsed}>
				<Human sx={styles.iconMenu} />
			</MenuLink2>

			<MenuLink2
				href={`/${lng}/default-transaction-value`}
				title={t('defaultTransactionValue')}
				collapsed={collapsed}
			>
				<ArrowCircleRightOutlined sx={styles.iconMenu} />
			</MenuLink2>

			<Divider sx={[styles.divider, collapsed ? { width: '100%' } : {}]} />

			{session?.user?.role === 'Admin' && (
				<>
					<MenuLink2 href={`/${lng}/user`} title={t('users')} collapsed={collapsed}>
						<AccountOutline sx={styles.iconMenu} />
					</MenuLink2>

					<MenuLink2 href={`/${lng}/role`} title={t('roles')} collapsed={collapsed}>
						<SecurityOutlined sx={styles.iconMenu} />
					</MenuLink2>

					<MenuAction2 onClick={saveDb} collapsed={collapsed} title={t('backup')}>
						<BackupOutlined sx={styles.iconMenu} />
					</MenuAction2>
				</>
			)}

			{!isMobile && (
				<ContractMenuAction2
					onClick={() => setCollapsed(!collapsed)}
					collapsed={collapsed}
					title={t(collapsed ? 'expandMenu' : 'smallMenu2')}
				/>
			)}

			{openConvertCurrencyForm && <ConversionCurrency onClose={() => setOpenConvertCurrencyForm(false)} />}
		</Paper>
	)
}

export default Menu

const styles = {
	menu: {
		background: 'linear-gradient(180deg, #f7fbff 0%, #eef4ff 100%)',
		borderRadius: '18px',
		border: '1px solid #d6e2ff',
		minWidth: '250px',
		width: '250px',
		minHeight: '250px',
		height: 'fit-content',
		display: 'flex',
		flexDirection: 'column',
		py: '14px',
		gap: '6px',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		overflow: 'hidden',
		boxShadow: '0 10px 24px rgba(20, 47, 79, 0.09)'
	},
	collapsedMenu: {
		minWidth: '74px',
		width: '74px',
		alignItems: 'center'
	},
	iconMenu: {
		color: '#3f5f9b',
		height: '20px',
		width: '20px',
		flexShrink: 0
	},
	divider: {
		my: '8px',
		mx: '8px',
		borderColor: '#d6e2ff'
	}
}
