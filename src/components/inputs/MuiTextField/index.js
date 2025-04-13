import { FormControl, FormHelperText, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const MuiTextfield = ({ fieldName, control, errors, options = {}, rules = {} }) => {
    return <FormControl fullWidth>
        <Controller
            name={fieldName}
            control={control}
            rules={{ required: false, ...rules }}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    size='small'
                    {...options}
                    error={Boolean(error)}
                    rows={options?.multiline ? options?.rows ?? 3 : 1}
                />
            )}
        />
        {errors?.[fieldName] && <FormHelperText sx={{ color: "error.main" }}>
            {errors[fieldName].message}
        </FormHelperText>}
    </FormControl>
}

export default MuiTextfield