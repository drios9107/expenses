'use client';;
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
import { useCategory, useSubCategory, useTransaction } from "@/hooks";
import { getLineColor } from "@/utils/helpers";

const Transaction = () => {
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
        renderHeader: () => <ColumnHeader title={'Category'} />,
        renderCell: ({ row }) => <Tooltip title={row?.description}>
            <Typography variant='body1' color={getLineColor(row)}>{getCategory(row)}</Typography>
        </Tooltip>,
        valueGetter: ({ row }) => getCategory(row)
    },
    {
        flex: 1.5,
        minWidth: 150,
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
        flex: 1,
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Amount'} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{row?.amount}</Typography>,
        valueGetter: ({ row }) => row?.amount
    },
    {
        flex: 1,
        minWidth: 80,
        field: "type",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Type'} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{getType(row)}</Typography>,
        valueGetter: ({ row }) => getType(row)
    },
    {
        flex: 1,
        minWidth: 110,
        field: "isExpense",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Is Expense?'} />,
        renderCell: ({ row }) => <Typography sx={{ width: '100%', textAlign: 'center' }} color={getLineColor(row)}>{row?.isExpense ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}</Typography>,
    },
    {
        flex: 1,
        minWidth: 110,
        field: "isRecurrent",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Is Recurrent?'} />,
        renderCell: ({ row }) => <Typography sx={{ width: '100%', textAlign: 'center' }} color={getLineColor(row)}>{row?.isRecurrent ? <Check sx={styles.icon} /> : <DoNotDisturb sx={styles.icon} />}</Typography>,
    },
    {
        minWidth: 180,
        field: "actions",
        sortable: false,
        disableColumnMenu: true,
        headerAlign: 'center',
        renderHeader: () => <Tooltip title={"Create"}>
            <IconButton onClick={() => setOpen(true)}>
                <Add sx={styles.icon} />
            </IconButton>
        </Tooltip>,
        renderCell: ({ row }) => <ActionColumn iconColor={getLineColor(row)}
            onDetails={() => setItemToView(row)}
            onUpdate={() => { setItemToUpdate(row), setOpen(true) }}
            onDelete={() => setItemToDelete(row)}
        />
    }], [getCategory, getSubCategory, getType])

    const getTransactionsList = useMemo(() => {
        return [...transactions]?.sort((a, b) => b?.date - a?.date)
    }, [transactions])

    return (
        <>
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
    );
};

export default Transaction;


const styles = {
    icon: { height: "20px", width: "20px" }
}