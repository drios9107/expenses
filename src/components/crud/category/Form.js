import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from 'react';
import { useCategory } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'

const schema = yup.object().shape({
    name: yup.string().required(),
});

const defaultValues = { name: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'category')

    const { isLoading, createCategory, updateCategory } = useCategory();

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(preparedData => {
        item ?
            updateCategory(preparedData) :
            createCategory(preparedData);
        onClose();
    }, [createCategory, item, onClose, updateCategory])

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
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}