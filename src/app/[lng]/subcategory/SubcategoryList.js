'use client'
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import ColumnHeader from '@/components/ColumnHeader'
import ActionColumn from '@/components/ActionColumn'
import Loader from '@/components/Loader'
import DataList from '@/components/DataList'
import Details from '@/components/crud/subcategory/Details'
import { Add } from '@mui/icons-material'
import Form from '@/components/crud/subcategory/Form'
import DeleteModal from '@/components/DeleteModal'
import { useCategory, useList, useSubCategory } from '@/hooks'
import { useTranslation } from '@/hooks/useTranslation'
import { useToast } from '@/hooks/useToast'
import { iconCellStyles } from '@/utils/helpers'
import ActionHeader from '@/components/ActionHeader'

const Subcategory = ({ initialItems = [], params, error }) => {
	const { t } = useTranslation(params?.lng ?? 'en', 'subCategory')
	const [open, setOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState()
	const [itemToUpdate, setItemToUpdate] = useState()
	const [itemToView, setItemToView] = useState()

	const { isLoading: isLoadingCategories } = useCategory()
	const { isLoading, deleteSubCategory } = useSubCategory()
	const { subCategories, setSubCategories } = useList()
	const { toastError } = useToast()

	useEffect(() => {
		setSubCategories(initialItems)
	}, [initialItems, setSubCategories])

	useEffect(() => {
		if (error) toastError(error)
	}, [error, toastError])

	const onDelete = useCallback(() => {
		deleteSubCategory(itemToDelete?._id)
		setItemToDelete()
	}, [deleteSubCategory, itemToDelete?._id])

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
				flex: 0.4,
				minWidth: 200,
				field: 'category',
				sortable: true,
				renderHeader: () => <ColumnHeader title={t('category')} />,
				renderCell: ({ row }) => <Typography>{row?.category?.name}</Typography>,
				valueGetter: (uid, row) => row?.category?.name
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
			<DataList title={t('subCategoryList')} columns={columns} rows={subCategories} />
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
			{(isLoading || isLoadingCategories) && <Loader isLoading />}
		</>
	)
}

export default Subcategory
