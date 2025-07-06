'use client';
import { useCallback, useMemo } from "react";
import SimpleModal from "./SimpleModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import MuiTextfield from "./inputs/MuiTextField";
import { Box } from "@mui/material";
import BoxRow from "./BoxRow";
import MuiSingleSelectField from "./inputs/MuiSingleSelectField";
import FormActionButtons from "./FormActionButtons";
import { typeList } from "@/utils/helpers";
import { useCurrencies } from "@/hooks";
import MuiDatePicker from "./inputs/MuiDatePicker";
import moment from "moment";

const schema = yup.object().shape({
    fromType: yup.string().required(),
    toType: yup.string().required(),
    sourceAmount: yup.number().required().min(1).default(1),
    finalAmount: yup.number().required().min(1).default(1),
    description: yup.string().nullable().default('Converted x usdt to y usd')
});

const defaultValues = {
    date: moment().valueOf(),
    fromType: 'usdt',
    toType: 'cup',
    sourceAmount: 1,
    finalAmount: 1,
    description: '',
}


const ConversionCurrency = ({ onClose = () => { } }) => {
    const { lng = 'en' } = useParams();
    const { t } = useTranslation(lng, 'common')
    const { isLoading, convertCurrency } = useCurrencies();

    const { handleSubmit, control, reset, formState: { errors }, } = useForm({ resolver: yupResolver(schema), defaultValues });

    const amountOptions = useMemo(() => ({ label: t('amount'), type: 'number', slotProps: { htmlInput: { min: 0 } } }), [t]);

    const onSubmit = useCallback(async (data) => {
        const preparedData = {
            ...data,
            date: moment(data.date).valueOf()
        }
        const response = await convertCurrency(preparedData);
        if (response)
            onClose();
    }, [convertCurrency, onClose]);

    const onCancel = useCallback(() => {
        reset(defaultValues)
        onClose()
    }, [onClose, reset])

    return <SimpleModal onClose={onClose} title={t('convertCurrency')} isLoading={isLoading}>
        <Box sx={styles.container}>
            <BoxRow>
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'fromType'}
                    options={{ label: t('fromType') }}
                    list={typeList}
                />
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'sourceAmount'}
                    options={amountOptions}
                />
            </BoxRow>
            <BoxRow>
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'toType'}
                    options={{ label: t('toType') }}
                    list={typeList}
                />
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'finalAmount'}
                    options={amountOptions}
                />
            </BoxRow>


            <Box sx={styles.container}>
                <MuiDatePicker
                    control={control}
                    errors={errors}
                    fieldName={'date'}
                    options={{ label: t('date'), maxDate: moment().toDate() }}
                />
            </Box>

            <Box sx={styles.container} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'description'}
                    options={{ label: t('description'), multiline: true }}
                />
            </Box>

            <FormActionButtons onClose={onCancel} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal>
}

export default ConversionCurrency


const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}