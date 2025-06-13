import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useMemo } from 'react'

const LandingPageImageDescription = ({ alt = 'img', src, description, useImageOnLeft = true, children }) => {
    const getImage = useMemo(() => <Box sx={styles.imageContainer}>
        <Image src={src} alt={alt} width={100} height={100} style={styles.rowImage} />
    </Box>, [alt, src])


    return <Box sx={styles.row}>
        {useImageOnLeft && getImage}
        {children ?? <Typography sx={styles.rowItem}>{description}</Typography>}
        {!useImageOnLeft && getImage}
    </Box>
}

export default LandingPageImageDescription


const styles = {
    row: { display: 'flex', flexDirection: 'row', gap: '25px', justifyContent: 'center', alignItems: 'center', width: 'min(80%, 700px)' },
    rowItem: { flex: 1, textAlign: 'justify' },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowImage: {
        boxShadow: '0.5px 0.5px 1.5px 1px #02aba8',
        borderRadius: '16px',
    }
}