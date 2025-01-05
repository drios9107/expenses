'use client';
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ColumnHeader from "@/components/ColumnHeader";
import ActionColumn from "@/components/ActionColumn";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/transaction/Details";
import { Add, Check, DoNotDisturb, NoteAlt, NoteAltOutlined } from "@mui/icons-material";
import Form from "@/components/crud/transaction/Form";
import DeleteModal from "@/components/DeleteModal";
import moment from "moment";
import { typeList } from "@/components/crud/transaction/Form";
import { useCategory, useSubCategory, useRecurrentTransaction } from "@/hooks";

const RecurrentTransaction = () => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, recurrentTransactions, getRecurrentTransactions, deleteRecurrentTransaction } = useRecurrentTransaction();
    const { isLoading: isLoadingCategories, categories, getCategories } = useCategory()
    const { isLoading: isLoadingSubCategories, subCategories, getSubCategories } = useSubCategory()

    useEffect(() => {
        getRecurrentTransactions();
        getCategories();
        getSubCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = useCallback(() => {
        deleteRecurrentTransaction(itemToDelete?._id);
        setItemToDelete();
    }, [deleteRecurrentTransaction, itemToDelete?._id])

    const getType = useCallback(row => {
        return typeList.find(i => i._id === row?.type)?.name
    }, [])

    const getCategory = useCallback(row => {
        return categories.find(i => i._id === row?.category)?.name
    }, [categories])

    const getSubCategory = useCallback(row => {
        return subCategories.find(i => i._id === row?.subCategory)?.name
    }, [subCategories])

    const columns = useMemo(() => [{
        flex: 2,
        minWidth: 200,
        field: "category",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Category'} />,
        renderCell: ({ row }) => <Tooltip title={row?.description}>
            <Typography variant='body1'>{getCategory(row)}</Typography>
        </Tooltip>,
        valueGetter: (uid, row) => getCategory(row)
    },
    {
        flex: 1.5,
        minWidth: 200,
        field: "subCategory",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Subcategory'} />,
        renderCell: ({ row }) => <Typography variant='body1'>{getSubCategory(row)}</Typography>,
        valueGetter: (uid, row) => getSubCategory(row)
    },
    {
        flex: 1,
        minWidth: 120,
        field: "date",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Date'} />,
        renderCell: ({ row }) => <Typography variant='body1'>{moment(row?.date).format('YYYY-MM-DD')}</Typography>,
        valueGetter: (uid, row) => moment(row?.date).format('YYYY-MM-DD')
    },
    {
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Amount'} />,
        renderCell: ({ row }) => <Typography variant='body1'>{row?.amount}</Typography>,
        valueGetter: (uid, row) => row?.amount
    },
    {
        minWidth: 80,
        field: "type",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Type'} />,
        renderCell: ({ row }) => <Typography variant='body1'>{getType(row)}</Typography>,
        valueGetter: (uid, row) => getType(row)
    },
    {
        minWidth: 60,
        field: "isExpense",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Is Expense?'} />,
        renderCell: ({ row }) => <Typography sx={{ width: '100%', textAlign: 'center' }}>{row?.isExpense ? <Check /> : <DoNotDisturb />}</Typography>,
    },
    {
        minWidth: 180,
        field: "actions",
        sortable: false,
        disableColumnMenu: true,
        headerAlign: 'center',
        renderHeader: () => <Tooltip title={"Create"}>
            <IconButton onClick={() => setOpen(true)}>
                <Add color="#7e7e7e" sx={{ height: "20px", width: "20px" }} />
            </IconButton>
        </Tooltip>,
        renderCell: ({ row }) => <ActionColumn
            onDetails={() => setItemToView(row)}
            onUpdate={() => { setItemToUpdate(row), setOpen(true) }}
            onDelete={() => setItemToDelete(row)}
        />
    }], [getCategory, getSubCategory, getType])


    const getRecurrentTransactionsList = useMemo(() => {
        return [...recurrentTransactions]?.sort((a, b) => b?.date - a?.date)
    }, [recurrentTransactions])

    return (
        <>
            <DataList
                title="Recurrent transaction list"
                columns={columns}
                rows={getRecurrentTransactionsList}
            />
            {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
            {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
            {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
            {(isLoading || isLoadingCategories || isLoadingSubCategories) && <Loader isLoading />}
        </>
    );
};

export default RecurrentTransaction;
