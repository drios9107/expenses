import ShowFieldErrors from '@/components/ShowFieldErrors'
import { FormControl, InputAdornment, TextField } from '@mui/material'

const MuiTextfieldWithoutControl = ({ fieldName, state, setState = () => {}, errors, options = {} }) => {
	return (
		<FormControl>
			<TextField
				defaultValue={state}
				onChange={v => (!options.onBlur ? setState(v?.target?.value) : () => {})}
				size="small"
				rows={options?.multiline ? (options?.rows ?? 3) : 1}
				slotProps={{
					input: {
						endAdornment: options?.endAdornment ? (
							<InputAdornment position="end">{options?.endAdornment}</InputAdornment>
						) : null,
						startAdornment: options?.startAdornment ? (
							<InputAdornment position="start">{options?.startAdornment}</InputAdornment>
						) : null
					}
				}}
				{...options}
			/>
			<ShowFieldErrors errors={errors} fieldName={fieldName} />
		</FormControl>
	)
}

export default MuiTextfieldWithoutControl
