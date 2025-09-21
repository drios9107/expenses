import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo } from 'react';
import { useDebt, useList, usePerson } from '@/hooks'
import FormActionButtons from '@/components/FormActionButtons'
import { useParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { en, es } from 'yup-locales'
import BoxRow from '@/components/BoxRow';
import moment from 'moment';
import PersonSelect from '@/components/PersonSelect';
import MuiSwitch from '@/components/inputs/MuiSwitch';
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField';
import { getPersonFullName, typeList } from '@/utils/helpers';
import MuiDatePicker from '@/components/inputs/MuiDatePicker';

const schema = yup.object().shape({
    person: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).required(),
    date: yup.date().max(moment().set('days', moment().day() + 1).toDate()).required(),
    amount: yup.number().min(0).required(),
    paid: yup.number().min(0).required(),
    type: yup.string().required(),
    description: yup.string().nullable(),
    transferId: yup.string().required(),
});

const defaultValues = {
    person: "",
    date: moment().toDate(),
    amount: 0,
    paid: 0,
    type: 'cup',
    description: '',
    isMyDebt: false,
    isCompleted: false,
    transferId: 'cash'
}

const Form = ({ item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', 'debt')

    const { persons } = useList();
    const { isLoading, createDebt, updateDebt } = useDebt();
    const { isLoading: isLoadingPerson, getPersons } = usePerson();

    useEffect(() => {
        getPersons()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, setValue, formState: { errors, isDirty, isValid }, watch
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const amountWatcher = watch('amount')
    const paidWatcher = watch('paid')

    useEffect(() => {
        setValue('isCompleted', amountWatcher === paidWatcher && amountWatcher > 0)
    }, [amountWatcher, paidWatcher, setValue])

    const getPersonList = useMemo(() => {
        return persons.map(i => ({ _id: i?._id, name: getPersonFullName(i) }))
    }, [persons])

    const onSubmit = useCallback(async data => {
        const preparedData = { ...data, date: moment(data?.date).set({ h: 8, m: 0, s: 0, milliseconds: 0 }).valueOf() }
        const response = await item ?
            updateDebt(preparedData) :
            createDebt(preparedData);

        if (response)
            onClose();
    }, [createDebt, item, onClose, updateDebt])

    return <SimpleModal onClose={onClose} title={item ? t('edit') : t('create')} isLoading={isLoading || isLoadingPerson}>
        <Box sx={styles.container}>
            <Box sx={styles.container}>
                <PersonSelect
                    list={getPersonList}
                    control={control}
                    errors={errors}
                    options={{ label: t('person') }}
                />
            </Box>
            <Box sx={styles.container}>
                <MuiDatePicker
                    control={control}
                    errors={errors}
                    fieldName={'date'}
                    options={{ label: t('date'), maxDate: moment().toDate() }}
                />
            </Box>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'amount'}
                    options={{ label: t('amount'), type: 'number', slotProps: { htmlInput: { min: 0 } } }}
                />
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'paid'}
                    options={{ label: t('paid'), type: 'number', slotProps: { htmlInput: { min: 0, max: amountWatcher } } }}
                />

            </BoxRow>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'transferId'}
                    options={{ label: t('transferId') }}
                />
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'type'}
                    options={{ label: t('type') }}
                    list={typeList}
                />
            </BoxRow>
            <BoxRow>
                <MuiSwitch
                    control={control}
                    fieldName={'isMyDebt'}
                    options={{ label: t('isMyDebt') }}
                />
                <MuiSwitch
                    control={control}
                    fieldName={'isCompleted'}
                    options={{ label: t('isCompleted') }}
                />
            </BoxRow>
            <Box sx={styles.container}>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'description'}
                    options={{ label: t('description'), multiline: true }}
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