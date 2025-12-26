import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MuiDatePicker from '@/components/inputs/MuiDatePicker'
import moment from 'moment'
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField'
import MuiSwitch from '@/components/inputs/MuiSwitch'
import { useCategory, useDefaultTransactionValue, useList, useRecurrentTransaction, useSubCategory, useTransaction } from '@/hooks';
import BoxRow from '@/components/BoxRow'
import WeekDayList from '@/components/WeekDayList'
import MonthDayList from '@/components/MonthDayList'
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import FormActionButtons from '@/components/FormActionButtons';
import { en, es } from 'yup-locales';
import CategorySelect from '@/components/CategorySelect';
import objectId from 'bson-objectid';
import SubCategorySelect from '@/components/SubCategorySelect';
import { typeList } from '@/utils/helpers';

const schema = yup.object().shape({
    category: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).required(),
    subCategory: yup.object().shape({
        name: yup.string().required(),
        _id: yup.string().required()
    }).nullable(),
    date: yup.date().max(moment().set('days', moment().day() + 1).toDate()).required(),
    amount: yup.number().min(0).required(),
    type: yup.string().required(),
    description: yup.string().nullable(),
});

const defaultValues = {
    category: '',
    date: moment().toDate(),
    amount: 0,
    type: 'cup',
    description: '',
    isExpense: true,
    isRecurrent: false
}

const frequencyList = [
    { _id: 'daily' },
    { _id: 'twoDays' },
    { _id: 'daysWeek' },
    { _id: 'daysMonth' }
]

const Form = ({ predefinedDay, item, onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng ?? 'en', ['common', 'transactions'])
    const pathName = usePathname()
    const { isLoading, updateTransaction, createTransaction } = useTransaction();
    const { isLoading: isLoadingCategory, getCategories } = useCategory();
    const { isLoading: isLoadingSubCategory, getSubCategories } = useSubCategory();
    const { getDefaultTransactionValuesByCategoryAndSubCategory } = useDefaultTransactionValue();
    const { isLoading: isLoadingRecurrentTransaction, updateRecurrentTransaction, createRecurrentTransaction } = useRecurrentTransaction();
    const { categories, subCategories } = useList();
    const [newCategory, setNewCategory] = useState()
    const [newSubCategory, setNewSubCategory] = useState()

    const [daysWeek, setDaysWeek] = useState([]);
    const [daysMonth, setDaysMonth] = useState([]);

    const weekDayRef = useRef();
    const monthDayRef = useRef();

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
        if (!item && predefinedDay)
            setValue('date', moment(predefinedDay).toDate())
    }, [item, predefinedDay, setValue])

    useEffect(() => {
        if (item?.subCategory)
            setValue('subCategory', subCategories.find(i => i?._id === item?.subCategory?._id))
    }, [item?.subCategory, setValue, subCategories])

    const categoryWatcher = watch('category');
    const subCategoryWatcher = watch('subCategory');
    const isRecurrentWatcher = watch('isRecurrent');
    const isExpenseWatcher = watch('isExpense');
    const frequencyWatcher = watch('frequency');
    const dateWatcher = watch('date');

    const getDefaultValues = useCallback(async () => {
        const response = await getDefaultTransactionValuesByCategoryAndSubCategory(categoryWatcher?._id, subCategoryWatcher?._id)
        if (response) {
            if (response?.amount >= 0)
                setValue('amount', response?.amount)

            if (response?.description && response?.description !== '')
                setValue('description', response?.description)
        }
    }, [categoryWatcher?._id, getDefaultTransactionValuesByCategoryAndSubCategory, setValue, subCategoryWatcher?._id])

    useEffect(() => {
        if (categoryWatcher?._id && subCategoryWatcher?._id && !item)
            getDefaultValues()
    }, [categoryWatcher?._id, getDefaultValues, item, subCategoryWatcher?._id])

    const getCategoriesList = useMemo(() => {
        let tempCategories = [...categories];
        if (newCategory)
            tempCategories = [...tempCategories, newCategory].sort((a, b) => b?.name?.localeCompare(a?.name));

        return isExpenseWatcher ?
            tempCategories.filter(i => i?.name !== 'Ingresos') :
            tempCategories.filter(i => i?.name === 'Ingresos');
    }, [categories, isExpenseWatcher, newCategory])

    const getSubCategoriesList = useMemo(() => {
        let tempSubCategories = [...subCategories];
        if (newSubCategory)
            tempSubCategories = [...tempSubCategories, newSubCategory].sort((a, b) => b?.name?.localeCompare(a?.name));

        return tempSubCategories.filter(i => i.category?._id === categoryWatcher?._id)
    }, [categoryWatcher, newSubCategory, subCategories])

    const getFrequencyList = useMemo(() => {
        return frequencyList.map(i => ({ ...i, name: t(`common:frequencyList.${i._id}`) }))
    }, [t])

    const onCreateCategory = useCallback(v => {
        const newItem = { name: v, _id: objectId().toHexString() };
        setNewCategory(newItem);
    }, [])

    useEffect(() => {
        if (newCategory)
            setValue('category', newCategory)
    }, [newCategory, setValue])


    const onCreateSubCategory = useCallback(v => {
        const newItem = { name: v, _id: objectId().toHexString() };
        setNewSubCategory(newItem);
    }, [])

    useEffect(() => {
        if (newSubCategory)
            setValue('subCategory', newSubCategory)
    }, [newSubCategory, setValue])

    useEffect(() => {
        if (item?.isRecurrent && item?.weekDays?.length > 0)
            setDaysWeek(item.weekDays)
        else if (item?.isRecurrent && item?.monthDays?.length > 0)
            setDaysMonth(item.monthDays)
    }, [item?.isRecurrent, item?.monthDays, item?.weekDays])

    useEffect(() => {
        setValue('isRecurrent', pathName === `/${params?.lng}/recurrent-transaction`)
    }, [params?.lng, pathName, setValue])

    const onSubmit = useCallback(async data => {
        const preparedData = { ...data, date: moment(data?.date).set({ h: 8, m: 0, s: 0, milliseconds: 0 }).valueOf() }

        if (!preparedData?.isRecurrent) {
            delete preparedData['weekDays'];
            delete preparedData['monthDays'];
        } else if (preparedData?.isRecurrent && preparedData?.frequency === 'daysWeek')
            preparedData['weekDays'] = weekDayRef.current?.getSectionValues();
        else if (preparedData?.isRecurrent && preparedData?.frequency === 'daysMonth')
            preparedData['monthDays'] = monthDayRef.current?.getSectionValues();

        if (newCategory)
            preparedData['newCategory'] = newCategory;
        preparedData['category'] = newCategory?._id ?? data?.category?._id;

        if (newSubCategory)
            preparedData['newSubCategory'] = newSubCategory;
        preparedData['subCategory'] = newSubCategory?._id ?? data?.subCategory?._id;

        let response = false;
        if (preparedData?.isRecurrent)
            response = item ?
                await updateRecurrentTransaction(preparedData) :
                await createRecurrentTransaction({ ...preparedData, isActive: true })
        else
            response = item ?
                await updateTransaction(preparedData) :
                await createTransaction(preparedData);

        if (response) {
            setNewCategory();
            setNewSubCategory();
            if (window.location.href.includes('/dashboard'))
                onClose({ ...preparedData, category: newSubCategory?.name ?? data?.subCategory?.name, subCategory: newSubCategory?.name ?? data?.subCategory?.name });
            else
                onClose()
        }
    }, [createRecurrentTransaction, createTransaction, item, newCategory, newSubCategory, onClose, updateRecurrentTransaction, updateTransaction])

    const modalIsLoading = useMemo(() => isLoading || isLoadingRecurrentTransaction || isLoadingCategory || isLoadingSubCategory, [isLoading, isLoadingCategory, isLoadingRecurrentTransaction, isLoadingSubCategory])

    return <SimpleModal onClose={onClose} title={item ? t('common:edit') : t('common:create')} isLoading={modalIsLoading}>
        <Box sx={styles.container}>
            <Box sx={styles.container}>
                <CategorySelect
                    list={getCategoriesList}
                    control={control}
                    errors={errors}
                    onCreateCategory={onCreateCategory}
                    options={{ label: t('transactions:category'), disabled: item?.isRecurrent }}
                />
            </Box>
            <Box sx={styles.container}>
                <SubCategorySelect
                    list={getSubCategoriesList}
                    control={control}
                    errors={errors}
                    onCreateCategory={onCreateSubCategory}
                    options={{ label: t('transactions:subCategory'), disabled: item?.isRecurrent }}
                />
            </Box>
            <Box sx={styles.container}>
                <MuiDatePicker
                    control={control}
                    errors={errors}
                    fieldName={'date'}
                    options={{ label: t('transactions:date'), maxDate: moment().toDate(), disabled: item?.isRecurrent }}
                />
            </Box>
            <BoxRow>
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'amount'}
                    options={{ label: t('transactions:amount'), type: 'number', slotProps: { htmlInput: { min: 0 } } }}
                />
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'type'}
                    options={{ label: t('transactions:type'), disabled: item?.isRecurrent }}
                    list={typeList}
                />
            </BoxRow>
            <BoxRow>
                <MuiSwitch
                    control={control}
                    fieldName={'isExpense'}
                    options={{ label: t('transactions:isExpense') }}
                />
            </BoxRow>
            {isRecurrentWatcher && <>
                <BoxRow extraclasses={{ alignItems: frequencyWatcher === 'daysMonth' ? 'flex-start' : 'center' }}>
                    <MuiSingleSelectField
                        control={control}
                        errors={errors}
                        fieldName={'frequency'}
                        options={{ label: t('transactions:frequency') }}
                        list={getFrequencyList}
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