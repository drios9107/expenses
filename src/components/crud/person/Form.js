import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from 'react';
import { usePerson } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'
import BoxRow from '@/components/BoxRow';

const schema = yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string().required(),
});

const defaultValues = { name: "", lastname: "" }

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'person')

    const { isLoading, createPerson, updatePerson } = usePerson();

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(async preparedData => {
        const response = await item ?
            updatePerson(preparedData) :
            createPerson(preparedData);

        if (response)
            onClose();
    }, [createPerson, item, onClose, updatePerson])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading}>
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
            <FormActionButtons onClose={onClose} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}