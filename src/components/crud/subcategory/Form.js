import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from 'react';
import { useList, useSubCategory } from '@/hooks';
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'


const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.string().required(),
});

const defaultValues = { name: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'subCategory')
    const { categories } = useList();
    const { isLoading, createSubCategory, updateSubCategory } = useSubCategory();

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(preparedData => {
        item ?
            updateSubCategory(preparedData) :
            createSubCategory(preparedData);
        onClose();
    }, [createSubCategory, item, onClose, updateSubCategory])

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
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'category'}
                    options={{ label: t('category') }}
                    list={categories}
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