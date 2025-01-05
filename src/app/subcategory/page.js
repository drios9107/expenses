'use client';
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ColumnHeader from "@/components/ColumnHeader";
import ActionColumn from "@/components/ActionColumn";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/subcategory/Details";
import { Add } from "@mui/icons-material";
import Form from "@/components/crud/subcategory/Form";
import DeleteModal from "@/components/DeleteModal";
import { useCategory, useSubCategory } from "@/hooks";

const Subcategory = () => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading: isLoadingCategories, getCategories, categories } = useCategory();
    const { isLoading, getSubCategories, subCategories, deleteSubCategory } = useSubCategory();

    useEffect(() => {
        getCategories();
        getSubCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCategory = useCallback(row => {
        return categories.find(i => i._id === row?.category)?.name
    }, [categories])

    const onDelete = useCallback(() => {
        deleteSubCategory(itemToDelete?._id);
        setItemToDelete();
    }, [deleteSubCategory, itemToDelete?._id])

    const columns = useMemo(() => [{
        flex: 0.4,
        minWidth: 200,
        field: "name",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Name'} />,
        renderCell: ({ row }) => <Typography>{row?.name}</Typography>
    },
    {
        flex: 0.4,
        minWidth: 200,
        field: "category",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Category'} />,
        renderCell: ({ row }) => <Typography>{getCategory(row)}</Typography>,
        valueGetter: (uid, row) => getCategory(row)
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
    }], [getCategory])

    return (
        <>
            <DataList
                title="Subcategory list"
                columns={columns}
                rows={subCategories}
            />
            {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
            {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
            {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
            {(isLoading || isLoadingCategories) && <Loader isLoading />}
        </>
    );
};

export default Subcategory;
