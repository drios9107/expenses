'use client';
// ** React Imports
import { useCallback, useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ColumnHeader from "@/components/ColumnHeader";
import ActionColumn from "@/components/ActionColumn";
import Loader from "@/components/Loader";
import Details from "@/components/crud/defaultTransactionValue/Details";
import { Add } from "@mui/icons-material";
import Form from "@/components/crud/defaultTransactionValue/Form";
import DeleteModal from "@/components/DeleteModal";
import { useList, useDefaultTransactionValue } from "@/hooks";
import { getLineColor, typeList } from "@/utils/helpers";
import { useFormat } from "@/hooks/useFormat";
import { useTranslation } from "@/hooks/useTranslation";
import DataListAdvancedSearch from "@/components/DataListAdvancedSearch";

const DefaultTransactionValue = ({ params }) => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, deleteDefaultTransactionValue } = useDefaultTransactionValue();
    const { currencyFormat } = useFormat();
    const { defaultTransactionValue, setDefaultTransactionValues } = useList();
    const { t } = useTranslation(params?.lng ?? 'en', 'transactions')

    const onDelete = useCallback(() => {
        deleteDefaultTransactionValue(itemToDelete?._id);
        setItemToDelete();
    }, [deleteDefaultTransactionValue, itemToDelete?._id])

    const getType = useCallback(row => {
        return typeList.find(i => i._id === row?.type)?.name
    }, [])

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
        minWidth: 100,
        field: "amount",
        sortable: true,
        renderHeader: () => <ColumnHeader title={t('amount')} />,
        renderCell: ({ row }) => <Typography variant='body1' color={getLineColor(row)}>{currencyFormat(row?.amount)}</Typography>,
        valueGetter: (uid, row) => row?.amount
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
    }], [currencyFormat, t])

    return (
        <>
            <DataListAdvancedSearch
                title={t('defaultTransactionValueList')}
                columns={columns}
                rows={defaultTransactionValue}
                setRows={setDefaultTransactionValues}
            />
            {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
            {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
            {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
            {isLoading && <Loader isLoading />}
        </>
    );
};

export default DefaultTransactionValue;


const styles = {
    icon: { height: "20px", width: "20px" }
}