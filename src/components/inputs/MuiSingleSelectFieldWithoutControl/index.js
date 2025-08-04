import ShowFieldErrors from "@/components/ShowFieldErrors";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MuiSingleSelectFieldWithoutControl = ({ fieldName, state, setState, errors = {}, options = {}, list = [], extraclasses = {} }) => {
    return (
        <FormControl fullWidth size="small" sx={extraclasses}>
            <InputLabel error={Boolean(errors?.[fieldName])}>{options?.label}</InputLabel>
            <Select
                value={state}
                onChange={setState}
                size="small"
                fullWidth
                error={Boolean(errors?.[fieldName])}
                MenuProps={{ style: { maxHeight: '400px' } }}
                renderValue={(v) => list?.find((item) => item._id == v)?.name}
                {...options}
            >
                {list?.map((item) => (
                    <MenuItem key={item?._id} value={item?._id}>
                        {item?.name}
                    </MenuItem>
                ))}
            </Select>
            <ShowFieldErrors errors={errors} fieldName={fieldName} />
        </FormControl>
    );
};

export default MuiSingleSelectFieldWithoutControl;
