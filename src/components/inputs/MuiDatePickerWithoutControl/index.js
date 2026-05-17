import { DatePicker } from '@mui/x-date-pickers'
import { FormControl } from '@mui/material'
import ShowFieldErrors from '@/components/ShowFieldErrors'

const MuiDatePickerWithoutControl = ({
	fieldName,
	state,
	setState = () => {},
	errors,
	options,
	formExtraclasses = {}
}) => {
	return (
		<FormControl size="small" sx={formExtraclasses}>
			<DatePicker
				value={state}
				onChange={setState}
				inputFormat="dd/MM/y"
				allowSameDateSelection
				slotProps={{
					textField: { size: 'small' },
					actionBar: {
						actions: ['clear']
					}
				}}
				sx={{ backgroundColor: '#fff', ...(options.sx ?? {}) }}
				{...options}
			/>
			<ShowFieldErrors errors={errors} fieldName={fieldName} />
		</FormControl>
	)
}

export default MuiDatePickerWithoutControl
