import { DatePicker } from '@mui/x-date-pickers';
import { FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import ShowFieldErrors from '@/components/ShowFieldErrors';

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
        <ShowFieldErrors errors={errors} fieldName={fieldName} />
    </FormControl>
}

export default MuiDatePicker
