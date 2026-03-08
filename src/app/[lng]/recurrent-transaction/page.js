'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/transaction/Details'
import { Add, Check, DoNotDisturb } from '@mui/icons-material'
import Form from '@/components/crud/transaction/Form'
import DeleteModal from '@/components/DeleteModal'
import moment from 'moment'
import { useCategory, useSubCategory, useRecurrentTransaction, useList } from '@/hooks'
import { PowerOn, PowerOff } from 'mdi-material-ui'
import { useFormat } from '@/hooks/useFormat'
import { t } from 'i18next'
import { useTranslation } from '@/hooks/useTranslation'
import { typeList } from '@/utils/helpers'

const RecurrentTransaction = ({ params }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'transactions')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToToogleActivation, setItemToToogleActivation] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { isLoading, getRecurrentTransactions, deleteRecurrentTransaction, updateRecurrentTransaction } =
		useRecurrentTransaction()
	const { isLoading: isLoadingCategories } = useCategory()
	const { isLoading: isLoadingSubCategories } = useSubCategory()
	const { recurrentTransactions } = useList()
	const { currencyFormat } = useFormat()

	useEffect(() => {
		getRecurrentTransactions()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onDelete = useCallback(() => {
		deleteRecurrentTransaction(itemToDelete?._id)
		setItemToDelete()
	}, [deleteRecurrentTransaction, itemToDelete?._id])

	const onToogleActivation = useCallback(() => {
		updateRecurrentTransaction({ ...itemToToogleActivation, isActive: !itemToToogleActivation?.isActive })
		setItemToToogleActivation()
	}, [updateRecurrentTransaction, itemToToogleActivation])

	const getType = useCallback(row => {
		return typeList.find(i => i._id === row?.type)?.name
	}, [])

	const columns = useMemo(
		() => [
			{
				flex: 2,
				minWidth: 200,
				field: 'category',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('category')} />,
				renderCell: ({ row }) => (
					<Tooltip title={row?.description}>
						<Typography variant="body1">{row?.category?.name}</Typography>
					</Tooltip>
				),
				valueGetter: (uid, row) => row?.category?.name
			},
			{
				flex: 1.5,
				minWidth: 200,
				field: 'subCategory',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('subCategory')} />,
				renderCell: ({ row }) => <Typography variant="body1">{row?.subCategory?.name}</Typography>,
				valueGetter: (uid, row) => row?.subCategory?.name
			},
			{
				flex: 1,
				minWidth: 120,
				field: 'date',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('date')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1">{moment(row?.date).format('YYYY-MM-DD')}</Typography>
				),
				valueGetter: (uid, row) => moment(row?.date).format('YYYY-MM-DD')
			},
			{
				minWidth: 100,
				field: 'amount',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('amount')} />,
				renderCell: ({ row }) => <Typography variant="body1">{currencyFormat(row?.amount)}</Typography>,
				valueGetter: (uid, row) => row?.amount
			},
			{
				minWidth: 80,
				field: 'type',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('type')} />,
				renderCell: ({ row }) => <Typography variant="body1">{getType(row)}</Typography>,
				valueGetter: (uid, row) => getType(row)
			},
			{
				minWidth: 110,
				field: 'isExpense',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('isExpense')} />,
				renderCell: ({ row }) => (
					<Typography sx={{ width: '100%', textAlign: 'center' }}>
						{row?.isExpense ? <Check /> : <DoNotDisturb />}
					</Typography>
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
						onDetails={() => setItemToView(row)}
						onUpdate={() => {
							setItemToUpdate(row)
							setOpen(true)
						}}
						onDelete={() => setItemToDelete(row)}
					>
						<Tooltip title={row?.isActive ? t('disable') : t('enable')}>
							<IconButton onClick={() => setItemToToogleActivation(row)}>
								{row?.isActive ? (
									<PowerOn color={'#000000'} sx={{ height: '20px', width: '20px' }} />
								) : (
									<PowerOff color={'#000000'} sx={{ height: '20px', width: '20px' }} />
								)}
							</IconButton>
						</Tooltip>
					</ActionColumn>
				)
			}
		],
		[currencyFormat, getType, t]
	)

	const getRecurrentTransactionsList = useMemo(() => {
		return [...recurrentTransactions]?.sort((a, b) => b?.date - a?.date)
	}, [recurrentTransactions])

	return (
		<>
			<DataList title={t('recurrentTransactionList')} columns={columns} rows={getRecurrentTransactionsList} />
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
			{itemToToogleActivation && (
				<DeleteModal
					title={t('changeStatus')}
					text={t('changeStatusText')}
					onClose={() => setItemToToogleActivation()}
					onClick={onToogleActivation}
				/>
			)}
			{(isLoading || isLoadingCategories || isLoadingSubCategories) && <Loader isLoading />}
		</>
	)
}

export default RecurrentTransaction
