import ShowFieldErrors from '@/components/ShowFieldErrors'
import { FormControl, InputAdornment, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const MuiTextfield = ({ fieldName, control, errors, options = {}, rules = {} }) => {
	return (
		<FormControl fullWidth>
			<Controller
				name={fieldName}
				control={control}
				rules={{ required: false, ...rules }}
				render={({ field, fieldState: { error } }) => (
					<TextField
						{...field}
						size="small"
						error={Boolean(error)}
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
						sx={{ backgroundColor: '#fff', ...(options.sx ?? {}) }}
						{...options}
					/>
				)}
			/>
			<ShowFieldErrors errors={errors} fieldName={fieldName} />
		</FormControl>
	)
}

export default MuiTextfield
