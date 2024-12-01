import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Badge, Box, Button, IconButton, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MuiDatePicker from '@/components/inputs/MuiDatePicker'
import moment from 'moment'
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField'
import MuiSwitch from '@/components/inputs/MuiSwitch'
import { useCategory, useRecurrentTransaction, useSubCategory, useTransaction } from '@/hooks'
import BoxRow from '@/components/BoxRow'
import WeekDayList from '@/components/WeekDayList'
import MonthDayList from '@/components/MonthDayList'
import { usePathname, useRouter } from 'next/navigation'

const schema = yup.object().shape({
    category: yup.string().required("This field is required"),
    subCategory: yup.string().nullable(),
    date: yup.date().max(moment().set('days', moment().day() + 1).toDate()).required("This field is required"),
    amount: yup.number().min(0).required("This field is required"),
    type: yup.string().required("This field is required"),
    description: yup.string().nullable(),
});

const defaultValues = {
    category: '',
    subCategory: '',
    date: moment().toDate(),
    amount: 0,
    type: 'cup',
    description: '',
    isExpense: true,
    isRecurrent: false
}
export const typeList = [
    { _id: 'cup', name: 'CUP' },
    { _id: 'mlc', name: 'MLC' },
    { _id: 'usd', name: 'USD' },
    { _id: 'usdt', name: 'USDT' }
]

export const frequencyList = [
    { _id: 'daily', name: 'Daily' },
    { _id: 'twoDays', name: 'Every two days' },
    { _id: 'daysWeek', name: 'On selected days of week' },
    { _id: 'daysMonth', name: 'On selected days of month' }
]

const Form = ({ item, onClose = () => { } }) => {
    const pathName = usePathname()
    const { isLoading, updateTransaction, createTransaction } = useTransaction();
    const { isLoading: isLoadingRecurrentTransaction, updateRecurrentTransaction, createRecurrentTransaction } = useRecurrentTransaction();
    const { categories } = useCategory();
    const { subCategories } = useSubCategory();

    const [daysWeek, setDaysWeek] = useState([]);
    const [daysMonth, setDaysMonth] = useState([]);

    const weekDayRef = useRef();
    const monthDayRef = useRef();

    const { control, handleSubmit, setValue, formState: { errors, isDirty, isValid }, watch
    } = useForm({ defaultValues: item ? { ...item, date: moment(item?.date).toDate() } : defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const categoryWatcher = watch('category');
    const isRecurrentWatcher = watch('isRecurrent');
    const frequencyWatcher = watch('frequency');
    const dateWatcher = watch('date');

    const getSubCategories = useMemo(() => {
        return subCategories.filter(i => i.category === categoryWatcher)
    }, [categoryWatcher, subCategories])

    useEffect(() => {
        if (item?.isRecurrent && item?.weekDays?.length > 0)
            setDaysWeek(item.weekDays)
        else if (item?.isRecurrent && item?.monthDays?.length > 0)
            setDaysMonth(item.monthDays)
    }, [item?.isRecurrent, item?.monthDays, item?.weekDays])

    useEffect(() => {
        setValue('isRecurrent', pathName === '/recurrent-transaction')
    }, [pathName, setValue])

    const onSubmit = useCallback(data => {
        const preparedData = { ...data, date: moment(data?.date).set({ h: 8, m: 0, s: 0, milliseconds: 0 }).valueOf() }

        if (!preparedData?.isRecurrent) {
            delete preparedData['weekDays'];
            delete preparedData['monthDays'];
        } else if (preparedData?.isRecurrent && preparedData?.frequency === 'daysWeek')
            preparedData['weekDays'] = weekDayRef.current?.getSectionValues();
        else if (preparedData?.isRecurrent && preparedData?.frequency === 'daysMonth')
            preparedData['monthDays'] = monthDayRef.current?.getSectionValues();

        if (preparedData?.isRecurrent)
            item ?
                updateRecurrentTransaction(preparedData) :
                createRecurrentTransaction(preparedData)
        else
            item ?
                updateTransaction(preparedData) :
                createTransaction(preparedData);
        onClose();
    }, [createRecurrentTransaction, createTransaction, item, onClose, updateRecurrentTransaction, updateTransaction])

    return <SimpleModal onClose={onClose} title={item ? 'Edit' : 'Create'} isLoading={isLoading || isLoadingRecurrentTransaction}>
        <Box sx={styles.container}>
            <Box sx={styles.container}>
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'category'}
                    options={{ label: 'Category', disabled: item?.isRecurrent }}
                    list={categories}
                />
            </Box>
            <Box sx={styles.container}>
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'subCategory'}
                    options={{ label: 'Subcategory', disabled: item?.isRecurrent }}
                    list={getSubCategories}
                />
            </Box>
            <Box sx={styles.container}>
                <MuiDatePicker
                    control={control}
                    errors={errors}
                    fieldName={'date'}
                    options={{ label: 'Date', maxDate: moment().toDate(), disabled: item?.isRecurrent }}
                />
            </Box>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'amount'}
                    options={{ label: 'Amount', type: 'number', disabled: item?.isRecurrent, slotProps: { htmlInput: { min: 0 } } }}
                />
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'type'}
                    options={{ label: 'Type', disabled: item?.isRecurrent }}
                    list={typeList}
                />
            </BoxRow>
            <BoxRow>
                <MuiSwitch
                    control={control}
                    fieldName={'isExpense'}
                    options={{ label: 'Is expense?' }}
                />
            </BoxRow>
            {isRecurrentWatcher && <>
                <BoxRow extraclasses={{ alignItems: frequencyWatcher === 'daysMonth' ? 'flex-start' : 'center' }}>
                    <MuiSingleSelectField
                        control={control}
                        errors={errors}
                        fieldName={'frequency'}
                        options={{ label: 'Frequency' }}
                        list={frequencyList}
                        extraclasses={{ flex: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                        {frequencyWatcher === 'daysWeek' && <WeekDayList ref={weekDayRef} daysWeek={daysWeek} />}
                        {frequencyWatcher === 'daysMonth' && <MonthDayList ref={monthDayRef} daysInMonth={moment(dateWatcher).daysInMonth()} daysMonth={daysMonth} />}
                    </Box>

                </BoxRow>
            </>}
            <Box sx={styles.container}>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'description'}
                    options={{ label: 'Description', multiline: true }}
                />
            </Box>
            <Box sx={styles.actionsContainer}>
                <Button variant='outlined' onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit(onSubmit)}> Save </Button>
            </Box>
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' },
}