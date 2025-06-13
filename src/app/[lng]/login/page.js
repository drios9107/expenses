'use client';
import MuiTextfield from "@/components/inputs/MuiTextField";
import { useTranslation } from "@/hooks/useTranslation";
import { fadeInStyles } from "@/utils/helpers";
import { messages } from "@/utils/messages";
import { yupResolver } from "@hookform/resolvers/yup";
import { GitHub } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { en, es } from "yup-locales";

const defaultValues = {
    email: '',
    password: ''
};

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(7, "Password must be at least 7 characters"),
});

const Login = ({ params }) => {
    const { t } = useTranslation(params?.lng, 'login')

    useEffect(() => {
        yup.setLocale(params?.lng === 'en' ? en : es)
    }, [params?.lng])

    const { control, handleSubmit, formState: { errors, isDirty, isValid }, watch
    } = useForm({ defaultValues, mode: "onChange", resolver: yupResolver(schema) });

    const onSubmit = useCallback(data => {
        signIn('credentials', { ...data, redirect: false })
            .then(res => {
                if (res?.error)
                    toast.error(messages[res.error])
            })
    }, [])

    const callProvider = useCallback(provider => {
        signIn(provider, { callbackUrl: '/', redirect: false })
            .catch(err => {
                console.log('***front error', err)
                toast.error(err.message)
            })
    }, [])

    const onKeyDown = useCallback(e => {
        if (e?.key === 'Enter')
            handleSubmit(onSubmit)()
    }, [handleSubmit, onSubmit])

    return <Paper sx={styles.topSection}>
        <Typography variant='h6'>{t('login.login')}</Typography>
        <MuiTextfield
            control={control}
            errors={errors}
            fieldName={'email'}
            options={{ label: t('login.email'), type: 'email', onKeyDown }}
        />
        <MuiTextfield
            control={control}
            errors={errors}
            fieldName={'password'}
            options={{ label: t('login.password'), type: 'password', onKeyDown }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={!isDirty || !isValid} size="small" >{t('login.login')}</Button>
            <Link href={`/${params?.lng}/`}>
                <Typography color='info' variant="subtitle">{t('login.back')}</Typography>
            </Link>
        </Box>
        <Divider sx={{ width: '100%' }} />

        <Box sx={styles.providersContainer}>
            <IconButton onClick={() => callProvider('github')}><GitHub color="info" /> </IconButton>
            {/* <IconButton onClick={() => callProvider('google')}><Google color="info" /> </IconButton> */}
        </Box>
    </Paper>
}

export default Login;

const styles = {
    topSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '300px', backgroundColor: '#fff', boxShadow: '2px 2px 10px #4D4D4D33', borderRadius: '16px', gap: '25px', p: '25px', ...fadeInStyles() },
    providersContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' },
}
