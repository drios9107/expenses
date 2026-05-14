'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/person/Details'
import { Add } from '@mui/icons-material'
import Form from '@/components/crud/person/Form'
import DeleteModal from '@/components/DeleteModal'
import { useList, usePerson } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import moment from 'moment'
import { useToast } from '@/hooks/useToast'
import ActionHeader from '@/components/ActionHeader'

const Persons = ({ initialItems = [], params, error }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'person')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { persons, setPersons } = useList()
	const { isLoading, deletePerson } = usePerson()
	const { toastError } = useToast()

	useEffect(() => {
		setPersons(initialItems)
	}, [initialItems, setPersons])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const onDelete = useCallback(() => {
		deletePerson(itemToDelete?._id)
		setItemToDelete()
	}, [deletePerson, itemToDelete?._id])

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
				minWidth: 200,
				field: 'lastname',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('lastname')} />,
				renderCell: ({ row }) => <Typography>{row?.lastname}</Typography>
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
			<DataList title={t('personList')} columns={columns} rows={persons} />
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

export default Persons
