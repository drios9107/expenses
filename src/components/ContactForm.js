import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/material';
import MuiTextfield from './inputs/MuiTextField';
import FormActionButtons from './FormActionButtons';
import MuiSingleSelectField from './inputs/MuiSingleSelectField';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import SimpleModal from './SimpleModal';
import { useMessages } from '@/hooks';

const contactSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required').min(10, 'Message should be at least 10 characters'),
    inquiryType: yup.string().required('Inquiry type is required'),
});

const defaultValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
}

const ContactForm = ({ onClose = () => { } }) => {
    const params = useParams();
    const { t } = useTranslation(params?.lng, 'contact')
    const { sendEmail } = useMessages();

    const inquiryOptions = useMemo(() => [
        { _id: 'job', name: t('jobOpportunity') },
        { _id: 'collaboration', name: t('collaboration') },
        { _id: 'question', name: t('techinalQuestion') },
        { _id: 'other', name: t('other') }
    ], [t]);

    const { handleSubmit, control, reset, formState: { errors }, } = useForm({ resolver: yupResolver(contactSchema), defaultValues });

    const onSubmit = useCallback(async (data) => {
        console.log('***Form data:', data);
        const response = await sendEmail(data);

        if (response)
            onClose();
    }, [onClose, sendEmail]);

    const onClear = useCallback(() => {
        reset(defaultValues)
    }, [reset])

    return <SimpleModal onClose={onClose} title={t('contactMe')}>
        <Box sx={styles.container}>
            <Box sx={styles.container} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'name'}
                    options={{ label: t('name') }}
                />
            </Box>
            <Box sx={styles.container} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'email'}
                    options={{ label: t('email'), type: 'email' }}
                />
            </Box>

            <Box sx={styles.container} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'subject'}
                    options={{ label: t('subject') }}
                />
            </Box>

            <Box sx={styles.container} >
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'inquiryType'}
                    options={{ label: t('inquiryType') }}
                    list={inquiryOptions}
                    extraclasses={{ flex: 1 }}
                />
            </Box>

            <Box sx={styles.container} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'message'}
                    options={{ label: t('message'), multiline: true }}
                />
            </Box>
            <FormActionButtons onClose={onClear} onCloseTitle={t('clean')} onClickTitle={t('send')} onClick={handleSubmit(onSubmit)} />
        </Box>
    </SimpleModal>
};

export default ContactForm;


const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}