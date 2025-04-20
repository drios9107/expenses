'use client';
import { Button, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';

const PrivacyPolicy = () => {
    const { back } = useRouter()
    return <Paper sx={styles.topSection}>
        <Typography variant='h6'>Política de Cookies</Typography>
        <Typography variant='body1' sx={{ textAlign: 'justify' }}>Este sitio web utiliza cookies esenciales para su funcionamiento, como la gestión de sesiones de usuario.
            {/* También utilizamos cookies no esenciales para analizar el tráfico y mejorar la experiencia del usuario.
        Puedes gestionar tus preferencias de cookies en cualquier momento haciendo clic en el enlace correspondiente en el pie de página. */}
        </Typography>
        <Button variant='contained' onClick={() => back()} size="small">Go Back</Button>
    </Paper>
};

export default PrivacyPolicy;

const styles = {
    topSection: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '500px', backgroundColor: '#fff', boxShadow: '2px 2px 10px #4D4D4D33', borderRadius: '16px', gap: '25px', p: '25px' },
}
