import { FormHelperText } from '@mui/material'
import React from 'react'

const ShowFieldErrors = ({ errors, fieldName }) => {
    if (errors?.[fieldName])
        return <FormHelperText sx={{ color: "error.main" }}>
            {errors[fieldName].message}
        </FormHelperText>

    return null
}

export default ShowFieldErrors