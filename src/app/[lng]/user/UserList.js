'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/user/Details'
import { Add } from '@mui/icons-material'
import Form from '@/components/crud/user/Form'
import DeleteModal from '@/components/DeleteModal'
import { useList, useUser } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import moment from 'moment'
import { useToast } from '@/hooks/useToast'
import ActionHeader from '@/components/ActionHeader'

const Users = ({ initialItems = [], lng, error }) => {
	const { t } = useTranslation(lng ?? 'en', 'user')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { users, setUsers } = useList()
	const { isLoading, deleteUser } = useUser()
	const { toastError } = useToast()

	useEffect(() => {
		setUsers(initialItems)
	}, [initialItems, setUsers])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const onDelete = useCallback(() => {
		deleteUser(itemToDelete?._id)
		setItemToDelete()
	}, [deleteUser, itemToDelete?._id])

	const columns = useMemo(
		() => [
			{
				flex: 1,
				minWidth: 250,
				field: 'email',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('email')} />,
				renderCell: ({ row }) => <Typography>{row?.email}</Typography>
			},
			{
				flex: 0.7,
				field: 'role',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('role')} />,
				renderCell: ({ row }) => <Typography>{row?.role?.name}</Typography>
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
			<DataList title={t('userList')} columns={columns} rows={users} />
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

export default Users
