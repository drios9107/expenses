import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box } from '@mui/material';
import MuiTextfield from './inputs/MuiTextField';
import FormActionButtons from './FormActionButtons';
import MuiSingleSelectField from './inputs/MuiSingleSelectField';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import SimpleModal from './SimpleModal';
import { useMessages } from '@/hooks';
import ReCAPTCHA from 'react-google-recaptcha';
import { useToast } from '@/hooks/useToast';

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
    const { toastError } = useToast();

    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
    const recaptchaRef = useRef();

    const inquiryOptions = useMemo(() => [
        { _id: 'job', name: t('jobOpportunity') },
        { _id: 'collaboration', name: t('collaboration') },
        { _id: 'question', name: t('techinalQuestion') },
        { _id: 'other', name: t('other') }
    ], [t]);

    const { handleSubmit, control, reset, formState: { errors }, } = useForm({ resolver: yupResolver(contactSchema), defaultValues });

    const onSubmit = useCallback(async (data) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (!recaptchaValue) {
            toastError(t('wrongRecaptcha'));
            return;
        }

        const response = await sendEmail(data);

        if (response)
            onClose();
    }, [onClose, sendEmail, toastError, t]);

    const onCancel = useCallback(() => {
        reset(defaultValues)
        onClose()
    }, [onClose, reset])

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

            <Box sx={{ mt: 2, mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setIsRecaptchaVerified(!!token)}
                />
            </Box>
            <FormActionButtons onClose={onCancel} onCloseTitle={t('cancel')} onClickTitle={t('send')} onClick={handleSubmit(onSubmit)} onClickProps={{ disabled: !isRecaptchaVerified }} />
        </Box>
    </SimpleModal>
};

export default ContactForm;


const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
}