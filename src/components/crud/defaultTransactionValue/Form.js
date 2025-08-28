import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo } from 'react';
import moment from 'moment'
import { useCategory, useList, useSubCategory, useDefaultTransactionValue } from '@/hooks';
import BoxRow from '@/components/BoxRow'
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import FormActionButtons from '@/components/FormActionButtons';
import { en, es } from 'yup-locales';
import CategorySelect from '@/components/CategorySelect';
import SubCategorySelect from '@/components/SubCategorySelect';

const schema = yup.object().shape({
    category: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).required(),
    subCategory: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).nullable(),
    amount: yup.number().min(0).nullable(),
    description: yup.string().nullable(),
});

const defaultValues = {
    category: '',
    amount: 0,
    description: '',
}

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', ['common', 'transactions'])
    const { isLoading, updateDefaultTransactionValues, createDefaultTransactionValues } = useDefaultTransactionValue();
    const { isLoading: isLoadingCategory, getCategories } = useCategory();
    const { isLoading: isLoadingSubCategory, getSubCategories } = useSubCategory();
    const { categories, subCategories } = useList();

    useEffect(() => {
        getCategories();
        getSubCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, setValue, formState: { errors, isDirty, isValid }, watch
    } = useForm({ defaultValues: item ? { ...item, date: moment(item?.date).toDate() } : defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    useEffect(() => {
        if (item?.category)
            setValue('category', categories.find(i => i?._id === item?.category?._id))
    }, [categories, item?.category, setValue])

    useEffect(() => {
        if (item?.subCategory)
            setValue('subCategory', subCategories.find(i => i?._id === item?.subCategory?._id))
    }, [item?.subCategory, setValue, subCategories])

    const categoryWatcher = watch('category');

    const getSubCategoriesList = useMemo(() => {
        let tempSubCategories = [...subCategories];

        return tempSubCategories.filter(i => i.category?._id === categoryWatcher?._id)
    }, [categoryWatcher, subCategories])

    const onSubmit = useCallback(async data => {
        const preparedData = { ...data, date: moment(data?.date).set({ h: 8, m: 0, s: 0, milliseconds: 0 }).valueOf() }

        preparedData['category'] = data?.category?._id;
        preparedData['subCategory'] = data?.subCategory?._id;

        let response = item ?
            await updateDefaultTransactionValues(preparedData) :
            await createDefaultTransactionValues(preparedData);

        if (response)
            onClose();
    }, [createDefaultTransactionValues, item, onClose, updateDefaultTransactionValues])

    const modalIsLoading = useMemo(() => isLoading || isLoadingCategory || isLoadingSubCategory, [isLoading, isLoadingCategory, isLoadingSubCategory])

    return <SimpleModal onClose={onClose} title={item ? t('common:edit') : t('common:create')} isLoading={modalIsLoading}>
        <Box sx={styles.container}>
            <Box sx={styles.container}>
                <CategorySelect
                    list={categories}
                    control={control}
                    errors={errors}
                    options={{ label: t('transactions:category'), disabled: item?.isRecurrent }}
                />
            </Box>
            <Box sx={styles.container}>
                <SubCategorySelect
                    list={getSubCategoriesList}
                    control={control}
                    errors={errors}
                    options={{ label: t('transactions:subCategory'), disabled: item?.isRecurrent }}
                />
            </Box>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'amount'}
                    options={{ label: t('transactions:amount'), type: 'number', slotProps: { htmlInput: { min: 0 } } }}
                />
            </BoxRow>
            <Box sx={styles.container}>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'description'}
                    options={{ label: t('transactions:description'), multiline: true }}
                />
            </Box>
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal>
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}