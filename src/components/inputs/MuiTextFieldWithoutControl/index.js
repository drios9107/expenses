import { FormControl, FormHelperText, TextField } from '@mui/material'

const MuiTextfieldWithoutControl = ({ fieldName, state, setState = () => { }, errors, options = {} }) => {
    return <FormControl>
        <TextField
            defaultValue={state}
            onChange={v => setState(v?.target?.value)}
            size='small'
            {...options}
            rows={options?.multiline ? options?.rows ?? 3 : 1}
            maxRows={Infinity}
        />
        {errors?.[fieldName] && <FormHelperText sx={{ color: "error.main" }}>
            {errors[fieldName].message}
        </FormHelperText>}
    </FormControl>
}

export default MuiTextfieldWithoutControl