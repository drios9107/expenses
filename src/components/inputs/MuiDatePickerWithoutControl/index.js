import { DatePicker } from '@mui/x-date-pickers';
import { FormControl, FormHelperText } from '@mui/material';

const MuiDatePickerWithoutControl = ({ fieldName, state, setState = () => { }, errors, options, formExtraclasses = {} }) => {
    return <FormControl size='small' sx={formExtraclasses}>
        <DatePicker
            value={state}
            onChange={setState}
            inputFormat='dd/MM/y'
            allowSameDateSelection
            {...options}
        />
        {errors?.[fieldName] && <FormHelperText sx={{ color: "error.main" }}>
            {errors[fieldName].message}
        </FormHelperText>}
    </FormControl>
}

export default MuiDatePickerWithoutControl
