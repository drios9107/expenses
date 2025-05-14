import ShowFieldErrors from '@/components/ShowFieldErrors'
import { FormControl, TextField } from '@mui/material';

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
        <ShowFieldErrors errors={errors} fieldName={fieldName} />
    </FormControl>
}

export default MuiTextfieldWithoutControl