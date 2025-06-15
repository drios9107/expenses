import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from 'react';
import { useList, useRole, useUser } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField';

const updateSchema = yup.object().shape({
    email: yup.string().email().required(),
    role: yup.string().required(),
});

const createSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(7),
    repeatPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
    role: yup.string().required(),
});

const defaultValues = { email: "", role: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'user')

    const { isLoading, createUser, updateUser } = useUser();
    const { isLoading: isLoadingRoles, getRoles } = useRole();
    const { roles } = useList()
    const [schema, setSchema] = useState(createSchema)

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    useEffect(() => {
        setSchema(item ? updateSchema : createSchema)
    }, [item])

    useEffect(() => {
        getRoles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: { ...item, role: item?.role?._id } ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(async preparedData => {
        if (item) {
            delete preparedData['password'];
            delete preparedData['repeatPassword'];
        }
        const response = await item ?
            updateUser(preparedData) :
            createUser(preparedData);

        if (response)
            onClose();
    }, [createUser, item, onClose, updateUser])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading || isLoadingRoles}>
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
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'role'}
                    options={{ label: t('role') }}
                    list={roles}
                />
            </Box>

            {!item && <>
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
            </>}
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}