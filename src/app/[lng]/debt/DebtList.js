'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/debt/Details'
import { Add, Check, DoNotDisturb } from '@mui/icons-material'
import Form from '@/components/crud/debt/Form'
import DeleteModal from '@/components/DeleteModal'
import { useList, useDebt } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import moment from 'moment'
import { typeList, getDebtLineColor, getPersonFullName } from '@/utils/helpers'
import { useFormat } from '@/hooks/useFormat'
import TypographyIconCell from '@/components/TypographyIconCell'
import { useToast } from '@/hooks/useToast'

const Debts = ({ initialItems = [], params, error }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'debt')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()
	const { currencyFormat } = useFormat()

	const { debts, setDebts } = useList()
	const { isLoading, deleteDebt } = useDebt()
	const { toastError } = useToast()

	useEffect(() => {
		setDebts(initialItems)
	}, [initialItems, setDebts])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const getType = useCallback(row => {
		return typeList.find(i => i._id === row?.type)?.name
	}, [])

	const onDelete = useCallback(() => {
		deleteDebt(itemToDelete?._id)
		setItemToDelete()
	}, [deleteDebt, itemToDelete?._id])

	const onUpdate = useCallback(row => {
		setItemToUpdate(row)
		setOpen(true)
	}, [])

	const columns = useMemo(
		() => [
			{
				flex: 2,
				minWidth: 150,
				field: 'person',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('person')} />,
				renderCell: ({ row }) => (
					<Tooltip title={row?.description}>
						<Typography variant="body1" color={getDebtLineColor(row)}>
							{getPersonFullName(row?.person)}
						</Typography>
					</Tooltip>
				),
				valueGetter: (uid, row) => getPersonFullName(row?.person)
			},
			{
				flex: 1,
				minWidth: 120,
				field: 'date',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('date')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1" color={getDebtLineColor(row)}>
						{moment(row?.date).format('YYYY-MM-DD')}
					</Typography>
				),
				valueGetter: (uid, row) => moment(row?.date).format('YYYY-MM-DD')
			},
			{
				flex: 1,
				minWidth: 100,
				field: 'amount',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('amount')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1" color={getDebtLineColor(row)}>
						$ {currencyFormat(row?.amount ?? 0)}
					</Typography>
				),
				valueGetter: (uid, row) => row?.amount
			},
			{
				flex: 1,
				minWidth: 100,
				field: 'paid',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('paid')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1" color={getDebtLineColor(row)}>
						$ {currencyFormat(row?.paid ?? 0)}
					</Typography>
				),
				valueGetter: (uid, row) => row?.paid
			},
			{
				flex: 1,
				minWidth: 80,
				field: 'type',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('type')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1" color={getDebtLineColor(row)}>
						{getType(row)}
					</Typography>
				),
				valueGetter: (uid, row) => getType(row)
			},
			{
				flex: 1,
				minWidth: 110,
				field: 'isMyDebt',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('isMyDebt')} />,
				renderCell: ({ row }) => (
					<TypographyIconCell color={getDebtLineColor(row)}>
						{row?.isMyDebt ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}
					</TypographyIconCell>
				)
			},
			{
				flex: 1,
				minWidth: 110,
				field: 'isCompleted',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('isCompleted')} />,
				renderCell: ({ row }) => (
					<TypographyIconCell color={getDebtLineColor(row)}>
						{row?.isCompleted ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}
					</TypographyIconCell>
				)
			},
			{
				minWidth: 180,
				field: 'actions',
				sortable: false,
				disableColumnMenu: true,
				headerAlign: 'center',
				renderHeader: () => (
					<Tooltip title={t('create')}>
						<IconButton onClick={() => setOpen(true)}>
							<Add color="#7e7e7e" sx={{ height: '20px', width: '20px' }} />
						</IconButton>
					</Tooltip>
				),
				renderCell: ({ row }) => (
					<ActionColumn
						iconColor={getDebtLineColor(row)}
						actionsContainerExtraclasses={{ justifyContent: 'flex-end' }}
						onDetails={() => setItemToView(row)}
						onUpdate={!row?.isCompleted ? () => onUpdate(row) : null}
						onDelete={() => setItemToDelete(row)}
					/>
				)
			}
		],
		[currencyFormat, getType, onUpdate, t]
	)

	return (
		<>
			<DataList title={t('debtList')} columns={columns} rows={debts} />
			{open && (
				<Form
					item={itemToUpdate}
					onClose={() => {
						setOpen(false)
						setItemToUpdate()
					}}
				/>
			)}
			{itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
			{itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
			{isLoading && <Loader isLoading />}
		</>
	)
}

export default Debts

const styles = {
	icon: { height: '20px', width: '20px' }
}
