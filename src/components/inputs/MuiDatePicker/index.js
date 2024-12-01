import { DatePicker } from '@mui/x-date-pickers';
import { FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

const MuiDatePicker = ({ rules = {}, fieldName, control, errors, options, formExtraclasses = {} }) => {
    return <FormControl fullWidth size='small' sx={formExtraclasses}>
        <Controller
            name={fieldName}
            control={control}
            rules={rules}
            render={({ field }) => <DatePicker
                {...field}
                inputFormat='dd/MM/y'
                allowSameDateSelection
                {...options}
            />}
        />
        {errors?.[fieldName] && <FormHelperText sx={{ color: "error.main" }}>
            {errors[fieldName].message}
        </FormHelperText>}
    </FormControl>
}

export default MuiDatePicker
