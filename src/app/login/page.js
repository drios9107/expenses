'use client';
import MuiTextfield from "@/components/inputs/MuiTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { GitHub } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { getCsrfToken, signIn } from "next-auth/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const defaultValues = {
    email: '',
    password: ''
};

const schema = yup.object().shape({
    // email: yup.string().required("This field is required"),
    // password: yup.string().required("This field is required").min(7, "Password must be at least 7 characters"),
});

const Login = () => {
    const { control, handleSubmit, formState: { errors, isDirty, isValid }, watch
    } = useForm({ defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(data => {
        signIn('credentials', data)
    }, [])

    const callProvider = useCallback(provider => {
        signIn(provider, { callbackUrl: '/' })
    }, [])

    const onKeyDown = useCallback(e => {
        if (e?.key === 'Enter')
            handleSubmit(onSubmit)()
    }, [handleSubmit, onSubmit])

    return <Paper sx={styles.topSection}>
        <Typography variant='h6'>Login</Typography>
        <MuiTextfield
            control={control}
            errors={errors}
            fieldName={'email'}
            options={{ label: 'Email', onKeyDown }}
        />
        <MuiTextfield
            control={control}
            errors={errors}
            fieldName={'password'}
            options={{ label: 'Password', type: 'password', onKeyDown }}
        />

        <Button variant='contained' onClick={handleSubmit(onSubmit)} /*disabled={!isDirty || !isValid}*/ size="small" >Login</Button>
        <Divider sx={{ width: '100%' }} />

        <Box sx={styles.providersContainer}>
            <IconButton onClick={() => callProvider('github')}><GitHub color="info" /> </IconButton>
            {/* <IconButton onClick={callProvider('google')}><Google color="info" /> </IconButton> */}
        </Box>
    </Paper>
}

export default Login;

const styles = {
    topSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '300px', backgroundColor: '#fff', boxShadow: '2px 2px 10px #4D4D4D33', borderRadius: '16px', gap: '25px', p: '25px' },
    providersContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' },
}

