import ShowFieldErrors from "@/components/ShowFieldErrors";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const MuiSingleSelectField = ({ fieldName, control, errors, options = {}, list = [], extraclasses = {} }) => {
  return (
    <FormControl fullWidth size="small" sx={extraclasses}>
      <Controller
        name={fieldName}
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field }) => (
          <>
            <InputLabel error={Boolean(errors[fieldName])}>{options?.label}</InputLabel>
            <Select
              {...field}
              size="small"
              fullWidth
              error={Boolean(errors[fieldName])}
              {...options}
              MenuProps={{ style: { maxHeight: '400px' }, disableScrollLock: true }}
              renderValue={(v) => list?.find((item) => item._id == v)?.name}
            >
              {list?.map((item) => (
                <MenuItem key={item?._id} value={item?._id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
      <ShowFieldErrors errors={errors} fieldName={fieldName} />
    </FormControl>
  );
};

export default MuiSingleSelectField;
