import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from 'react';
import { useUser } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(7),
    repeatPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
});

const defaultValues = { email: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'user')

    const { isLoading, createUser, updateUser } = useUser();

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(async preparedData => {
        const response = await item ?
            updateUser(preparedData) :
            createUser(preparedData);

        if (response)
            onClose();
    }, [createUser, item, onClose, updateUser])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading}>
        <Box sx={styles.container}>
            <Box sx={[styles.container, {}]} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'email'}
                    options={{ label: t('email'), type: 'email' }}
                />
            </Box>

            <Box sx={[styles.container, {}]} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'password'}
                    options={{ label: t('password'), type: 'password' }}
                />
            </Box>

            <Box sx={[styles.container, {}]} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'repeatPassword'}
                    options={{ label: t('repeatPassword'), type: 'password' }}
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