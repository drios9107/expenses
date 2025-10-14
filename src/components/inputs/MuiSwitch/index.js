import { FormControl, FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

const MuiSwitch = ({ control, fieldName, options, rules = {} }) => {
    return <FormControl fullWidth size="small" >
        <Controller
            name={fieldName}
            control={control}
            rules={{ required: false, ...rules }}
            defaultValue={false}
            render={({ field: { value, onChange } }) => <FormControlLabel
                control={<Switch size="small" checked={value} sx={(options?.disabled && options?.customDisabledStyles) ? styles.customDisabledSwitch : {}} onChange={onChange} disabled={options?.disabled} onClick={options?.onClick} />}
                label={options?.label}
                sx={{ ml: "5px", userSelect: 'none' }}
            />}
        />
    </FormControl>
}

export default MuiSwitch

const styles = {
    customDisabledSwitch: {
        '& .MuiSwitch-thumb': { backgroundColor: '#8383d1' },
        '& .MuiSwitch-switchBase': { right: '17px', left: 'unset' },
    }
}