import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo } from 'react';
import { useList, usePerson, useUser } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'
import BoxRow from '@/components/BoxRow';
import UserSelect from '@/components/UserSelect';
import Users from '@/app/[lng]/user/page';

const schema = yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string().required(),
    user: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).nullable(),
});

const defaultValues = { name: "", lastname: "", user: null }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'person')

    const { isLoading, createPerson, updatePerson } = usePerson();
    const { isLoading: isLoadingUsers, getUsers } = useUser();
    const { users } = useList();

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, setValue, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    useEffect(() => {
        if (item?.user && Users.length > 0) {
            const exists = users.find(i => i?._id === item?.user?._id)
            if (exists)
                setValue('user', { ...exists, name: exists?.email })
        }
    }, [users, item?.user, setValue])

    const getUserList = useMemo(() => {
        return users
            .filter(i => !i?.person)
            .map(i => ({ _id: i?._id, name: i?.email }))
    }, [users])

    const onSubmit = useCallback(async data => {
        const preparedData = { ...data }
        if (data?.user)
            preparedData.user = data.user._id

        const response = (await item) ?
            updatePerson(preparedData) :
            createPerson(preparedData);

        if (response)
            onClose();
    }, [createPerson, item, onClose, updatePerson])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading || isLoadingUsers}>
        <Box sx={styles.container}>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'name'}
                    options={{ label: t('name') }}
                />
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'lastname'}
                    options={{ label: t('lastname') }}
                />
            </BoxRow>
            <BoxRow>
                <UserSelect
                    list={getUserList}
                    control={control}
                    errors={errors}
                    options={{ label: t('user') }}
                />
            </BoxRow>
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}