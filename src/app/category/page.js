'use client';;
// ** React Imports
import { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ColumnHeader from "@/components/ColumnHeader";
import ActionColumn from "@/components/ActionColumn";
import Loader from "@/components/Loader";
import DataList from "@/components/DataList";
import Details from "@/components/crud/category/Details";
import { Add } from "@mui/icons-material";
import Form from "@/components/crud/category/Form";
import DeleteModal from "@/components/DeleteModal";
import { useCategory } from "@/hooks";

const Category = () => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemToUpdate, setItemToUpdate] = useState();
    const [itemToView, setItemToView] = useState();

    const { isLoading, getCategories, categories, deleteCategory } = useCategory();

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = useCallback(() => {
        deleteCategory(itemToDelete?._id);
        setItemToDelete();
    }, [deleteCategory, itemToDelete?._id])

    const columns = useMemo(() => [{
        flex: 0.4,
        minWidth: 200,
        field: "name",
        sortable: true,
        renderHeader: () => <ColumnHeader title={'Name'} />,
        renderCell: ({ row }) => <Typography variant='body1'>{row?.name}</Typography>
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
    }], [])

    return (
        <>
            <DataList
                title="Category list"
                columns={columns}
                rows={categories}
            />
            {open && <Form item={itemToUpdate} onClose={() => { setOpen(false); setItemToUpdate() }} />}
            {itemToView && <Details item={itemToView} onClose={() => setItemToView()} />}
            {itemToDelete && <DeleteModal onClose={() => setItemToDelete()} onClick={onDelete} />}
            {isLoading && <Loader isLoading />}
        </>
    );
};

export default Category;
