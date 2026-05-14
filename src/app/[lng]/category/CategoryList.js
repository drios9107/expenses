'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/category/Details'
import { Add } from '@mui/icons-material'
import Form from '@/components/crud/category/Form'
import DeleteModal from '@/components/DeleteModal'
import { useCategory, useList } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import { useToast } from '@/hooks/useToast'
import ActionHeader from '@/components/ActionHeader'

const Category = ({ initialItems = [], params, error }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'category')

	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { isLoading, deleteCategory } = useCategory()
	const { categories, setCategories } = useList()
	const { toastError } = useToast()

	useEffect(() => {
		setCategories(initialItems)
	}, [initialItems, setCategories])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const onDelete = useCallback(() => {
		deleteCategory(itemToDelete?._id)
		setItemToDelete()
	}, [deleteCategory, itemToDelete?._id])

	const columns = useMemo(
		() => [
			{
				flex: 0.4,
				minWidth: 200,
				field: 'name',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('name')} />,
				renderCell: ({ row }) => <Typography>{row?.name}</Typography>
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
			<DataList title={t('categoryList')} columns={columns} rows={categories} />
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

export default Category
