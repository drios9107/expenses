'use client';;
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import ColumnHeader from "@/components/ColumnHeader";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/transaction/Details";
import Form from "@/components/crud/transaction/Form";
import DeleteModal from "@/components/DeleteModal";
import moment from "moment";
import { useCategory, useSubCategory, useTransaction } from "@/hooks";
import { getLineColor } from "@/utils/helpers";
import { Typography } from "@mui/material";

const CurrentMonth = () => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, transactions, getTransactions, deleteTransaction } = useTransaction();
    const { isLoading: isLoadingCategories, categories, getCategories } = useCategory()
    const { isLoading: isLoadingSubCategories, subCategories, getSubCategories } = useSubCategory()

    useEffect(() => {
        getTransactions();
        getCategories();
        getSubCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = useCallback(() => {
        deleteTransaction(itemToDelete?._id);
        setItemToDelete();
    }, [deleteTransaction, itemToDelete?._id])

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
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{getCategory(row)}</Typography>,
        valueGetter: ({ row }) => getCategory(row)
    },
    {
        flex: 1.5,
        minWidth: 200,
        field: "subCategory",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Subcategory'} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{getSubCategory(row)}</Typography>,
        valueGetter: ({ row }) => getSubCategory(row)
    },
    {
        flex: 1,
        minWidth: 120,
        field: "date",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Date'} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{moment(row?.date).format('YYYY-MM-DD')}</Typography>,
        valueGetter: ({ row }) => moment(row?.date).format('YYYY-MM-DD')
    },
    {
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Amount'} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{row?.amount}</Typography>,
        valueGetter: ({ row }) => row?.amount
    }], [getCategory, getSubCategory])

    const getTransactionsList = useMemo(() => {
        const firstDay = moment().set({ D: 1, h: 0, m: 0, s: 0 });
        const amountDays = moment().daysInMonth();
        const lastDay = moment().set({ D: amountDays, h: 23, m: 59, s: 59 });

        return transactions.filter(i => i?.type === 'cup' && moment(i.date).isSameOrAfter(firstDay) && moment(i.date).isBefore(lastDay))
    }, [transactions])

    return <>
        <DataList
            title="Transaction list"
            columns={columns}
            rows={getTransactionsList}
        />
        {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
        {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
        {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
        {(isLoading || isLoadingCategories || isLoadingSubCategories) && <Loader isLoading />}
    </>
};

export default CurrentMonth;
