import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCategory, useList, useSubCategory } from '@/hooks';
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'
import CategorySelect from '@/components/CategorySelect'
import objectId from 'bson-objectid';


const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).required()
});

const defaultValues = { name: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'subCategory')
    const { categories } = useList();
    const { getCategories } = useCategory();
    const { isLoading, createSubCategory, updateSubCategory } = useSubCategory();
    const [newCategory, setNewCategory] = useState()

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { control, handleSubmit, setValue, watch, formState: { errors, isDirty, isValid }
    } = useForm({
        defaultValues: item ?? defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (item?.category)
            setValue('category', categories.find(i => i?._id === item?.category))
    }, [categories, item?.category, setValue])

    const getCategoriesList = useMemo(() => {
        if (newCategory)
            return [...categories, newCategory].sort((a, b) => b?.name?.localeCompare(a?.name));

        return categories
    }, [categories, newCategory])

    const onCreateCategory = useCallback(v => {
        const newItem = { name: v, _id: objectId().toHexString() };
        setNewCategory(newItem);
    }, [])

    useEffect(() => {
        if (newCategory)
            setValue('category', newCategory)
    }, [newCategory, setValue])

    const onSubmit = useCallback(async data => {
        const preparedData = { ...data }
        if (preparedData?.category?._id) {
            preparedData['newCategory'] = newCategory;
            preparedData['category'] = newCategory?._id;
        }

        const response = item ?
            await updateSubCategory(preparedData) :
            await createSubCategory(preparedData);

        if (response) {
            setNewCategory()
            onClose();
        }
    }, [createSubCategory, item, newCategory, onClose, updateSubCategory])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading}>
        <Box sx={styles.container}>
            <Box sx={[styles.container, {}]} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'name'}
                    options={{ label: t('name') }}
                />
            </Box>
            <Box sx={styles.container}>
                <CategorySelect
                    list={getCategoriesList}
                    control={control}
                    errors={errors}
                    onCreateCategory={onCreateCategory}
                    options={{ label: t('category') }}
                />
            </Box>
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}