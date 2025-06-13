import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const ContactLink = ({ href, title }) => {
    return <Link href={href}>
        <Typography sx={styles.rowItem}>{title}</Typography>
    </Link>
}

export default ContactLink

const styles = {
    rowItem: { flex: 1, textAlign: 'justify', cursor: 'pointer', '&:hover': { opacity: 0.7 } },
}
