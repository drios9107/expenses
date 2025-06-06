'use client';
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ColumnHeader from "@/components/ColumnHeader";
import ActionColumn from "@/components/ActionColumn";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/transaction/Details";
import { Add, Check, DoNotDisturb } from "@mui/icons-material";
import Form from "@/components/crud/transaction/Form";
import DeleteModal from "@/components/DeleteModal";
import moment from "moment";
import { typeList } from "@/components/crud/transaction/Form";
import { useCategory, useList, useSubCategory, useTransaction } from "@/hooks";
import { getLineColor } from "@/utils/helpers";
import { useFormat } from "@/hooks/useFormat";
import { useTranslation } from "@/hooks/useTranslation";
import DataListAdvancedSearch from "@/components/DataListAdvancedSearch";

const Transaction = ({ params }) => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, deleteTransaction } = useTransaction();
    const { categories, subCategories, transactions } = useList();
    const { currencyFormat } = useFormat();
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')

    const onDelete = useCallback(() => {
        deleteTransaction(itemToDelete?._id);
        setItemToDelete();
    }, [deleteTransaction, itemToDelete?._id])

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
        minWidth: 150,
        field: "category",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('category')} />,
        renderCell: ({ row }) => <Tooltip title={row?.description}>
            <Typography variant='body1' color={getLineColor(row)}>{row?.category?.name}</Typography>
        </Tooltip>,
        valueGetter: (uid, row) => row?.category?.name
    },
    {
        flex: 1.5,
        minWidth: 150,
        field: "subCategory",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('subCategory')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{row?.subCategory?.name}</Typography>,
        valueGetter: (uid, row) => row?.subCategory?.name
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
        flex: 1,
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('amount')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{currencyFormat(row?.amount)}</Typography>,
        valueGetter: (uid, row) => row?.amount
    },
    {
        flex: 1,
        minWidth: 80,
        field: "type",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('type')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{getType(row)}</Typography>,
        valueGetter: (uid, row) => getType(row)
    },
    {
        flex: 1,
        minWidth: 110,
        field: "isExpense",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('isExpense')} />,
        renderCell: ({ row }) => <Typography sx={{ width: '100%', textAlign: 'center' }} color={getLineColor(row)}>{row?.isExpense ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}</Typography>,
    },
    {
        flex: 1,
        minWidth: 110,
        field: "isRecurrent",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('isRecurrent')} />,
        renderCell: ({ row }) => <Typography sx={{ width: '100%', textAlign: 'center' }} color={getLineColor(row)}>{row?.isRecurrent ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}</Typography>,
    },
    {
        minWidth: 180,
        field: "actions",
        sortable: false,
        disableColumnMenu: true,
        headerAlign: 'center',
        renderHeader: () => <Tooltip title={t('create')}>
            <IconButton onClick={() => setOpen(true)}>
                <Add sx={styles.icon} />
            </IconButton>
        </Tooltip>,
        renderCell: ({ row }) => <ActionColumn iconColor={getLineColor(row)}
            onDetails={() => setItemToView(row)}
            onUpdate={() => { setItemToUpdate(row), setOpen(true) }}
            onDelete={() => setItemToDelete(row)}
        />
    }], [currencyFormat, getType, t])

    return (
        <>
            <DataListAdvancedSearch
                title={t('transactionList')}
                columns={columns}
            />
            {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
            {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
            {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
            {isLoading && <Loader isLoading />}
        </>
    );
};

export default Transaction;


const styles = {
    icon: { height: "20px", width: "20px" }
}