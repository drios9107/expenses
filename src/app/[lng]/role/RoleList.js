'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/role/Details'
import { Add } from '@mui/icons-material'
import Form from '@/components/crud/role/Form'
import DeleteModal from '@/components/DeleteModal'
import { useList, useRole } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import moment from 'moment'
import { useToast } from '@/hooks/useToast'
import ActionHeader from '@/components/ActionHeader'

const Roles = ({ initialItems = [], lng, error }) => {
	const { t } = useTranslation(lng ?? 'en', 'role')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { roles, setRoles } = useList()
	const { isLoading, deleteRole } = useRole()
	const { toastError } = useToast()

	useEffect(() => {
		setRoles(initialItems)
	}, [initialItems, setRoles])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const onDelete = useCallback(() => {
		deleteRole(itemToDelete?._id)
		setItemToDelete()
	}, [deleteRole, itemToDelete?._id])

	const columns = useMemo(
		() => [
			{
				flex: 1,
				minWidth: 200,
				field: 'name',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('name')} />,
				renderCell: ({ row }) => <Typography>{row?.name}</Typography>
			},
			{
				flex: 1,
				minWidth: 120,
				field: 'created_at',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('created_at')} />,
				renderCell: ({ row }) => (
					<Typography variant="body1">{moment(row?.created_at).format('YYYY-MM-DD')}</Typography>
				),
				valueGetter: (uid, row) => moment(row?.created_at).format('YYYY-MM-DD')
			},
			{
				minWidth: 180,
				field: 'actions',
				sortable: false,
				disableColumnMenu: true,
				headerAlign: 'center',
				renderHeader: () => <ActionHeader onClick={() => setOpen(true)} />,
				renderCell: ({ row }) => (
					<ActionColumn
						onDetails={() => setItemToView(row)}
						onUpdate={() => {
							setItemToUpdate(row)
							setOpen(true)
						}}
						onDelete={() => setItemToDelete(row)}
					/>
				)
			}
		],
		[t]
	)

	return (
		<>
			<DataList title={t('roleList')} columns={columns} rows={roles} />
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

export default Roles
