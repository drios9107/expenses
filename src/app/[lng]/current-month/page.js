'use client';
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import ColumnHeader from "@/components/ColumnHeader";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/transaction/Details";
import Form from "@/components/crud/transaction/Form";
import DeleteModal from "@/components/DeleteModal";
import moment from "moment";
import { useList, useTransaction } from "@/hooks";
import { getLineColor } from "@/utils/helpers";
import { Tooltip, Typography } from "@mui/material";
import { useFormat } from "@/hooks/useFormat";
import { useTranslation } from "@/hooks/useTranslation";
import { t } from "i18next";

const CurrentMonth = ({ params }) => {
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, getCurrentMonthTransactions, deleteTransaction } = useTransaction();
    const { currentMonthTransactions } = useList();
    const { currencyFormat } = useFormat();


    useEffect(() => {
        getCurrentMonthTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = useCallback(() => {
        deleteTransaction(itemToDelete?._id);
        setItemToDelete();
    }, [deleteTransaction, itemToDelete?._id])

    const columns = useMemo(() => [{
        flex: 2,
        minWidth: 200,
        field: "category",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('Category')} />,
        renderCell: ({ row }) => <Tooltip title={row?.description}>
            <Typography variant='body1' color={getLineColor(row)}>{row?.category}</Typography>
        </Tooltip>,
        valueGetter: (uid, row) => row?.category
    },
    {
        flex: 1.5,
        minWidth: 200,
        field: "subCategory",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('subCategory')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{row?.subCategory}</Typography>,
        valueGetter: (uid, row) => row?.subCategory
    },
    {
        flex: 1,
        minWidth: 120,
        field: "date",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('date')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{moment(row?.date).format('YYYY-MM-DD')}</Typography>,
        valueGetter: (uid, row) => moment(row?.date).format('YYYY-MM-DD')
    },
    {
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('amount')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{currencyFormat(row?.amount)}</Typography>,
        valueGetter: (uid, row) => row?.amount
    }], [currencyFormat, t])

    const getTransactionsList = useMemo(() => {
        const firstDay = moment().set({ D: 1, h: 0, m: 0, s: 0 });
        const amountDays = moment().daysInMonth();
        const lastDay = moment().set({ D: amountDays, h: 23, m: 59, s: 59 });

        return currentMonthTransactions.filter(i => i?.type === 'cup' && moment(i.date).isSameOrAfter(firstDay) && moment(i.date).isBefore(lastDay))
    }, [currentMonthTransactions])

    return <>
        <DataList
            title={t('transactionList')}
            columns={columns}
            rows={getTransactionsList}
        />
        {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
        {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
        {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
        {isLoading && <Loader isLoading />}
    </>
};

export default CurrentMonth;
