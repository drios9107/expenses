import { Close } from '@mui/icons-material';
import { Box, FormControl, styled, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useTheme } from "@mui/material";
import { useCallback, useMemo } from 'react';
import ShowFieldErrors from '@/components/ShowFieldErrors';

const colourStyles = (palette) => {
  return {
    control: (styles, state) => {
      const getBorder = () => {
        if (state.isDisabled) return "#4c4e6461";
        if (state.isFocused) return palette.primary.main;
        if (state.selectProps?.errors) return "red";

        return "#4c4e6438";
      };

      const getBackgroundColor = () => {
        if (state.isDisabled) return "#F2F3F2";

        return palette.background.paper;
      };

      const getHover = () => {
        const customBorder = state.isFocused ? `2px solid ${palette.primary.main}` : `1px solid lightgrey`;
        const css = {
          border: state?.selectProps?.customOptions?.dontUseBorder ? "0px" : customBorder,
        };
        if (state?.selectProps?.customOptions?.useTableCellBackgroundOnHover) css["backgroundColor"] = "#4c4e640d";

        return css;
      };

      return {
        ...styles,
        paddingTop: "3px",
        paddingBottom: "3px",
        borderRadius: "8px",
        border: state?.selectProps?.customOptions?.dontUseBorder
          ? "0px"
          : state.isFocused
            ? `2px solid ${palette.primary.main}`
            : `1px solid rgba(${getBorder()},0.22)`,
        "&:hover": getHover(),
        boxShadow: "none",
        backgroundColor: getBackgroundColor(),
      };
    },
    menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
    multiValue: (styles) => {
      return {
        ...styles,
        borderRadius: "30px",
        backgroundColor: "#666cff",
        padding: "5px 5px",
        display: "flex",
        alignItems: "center",
        gap: "7px",
      };
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        backgroundColor: "transparent",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
        color: "#fff",
      };
    },
    multiValueRemove: (styles) => {
      return {
        ...styles,
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#d1d3ff",
        padding: "5px",
        color: "#666cff",
        "&:hover": {
          backgroundColor: "#d1d3ff",
          color: "#666cff",
          opacity: 0.7,
        },
      };
    },
    container: (styles) => ({ ...styles, width: "100%" }),
    valueContainer: (styles) => ({ ...styles, padding: "2px 13px" }),
    placeholder: (styles) => ({ ...styles, color: palette.text.secondary }),
    menu: (styles) => ({ ...styles, backgroundColor: '#fff', zIndex: 100 }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state?.data?._id === state.selectProps.value?._id ? palette.action.hover : '#fff',
      color: palette.text.primary,
      "&:hover": { background: palette.action.hover },
    }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: '250px',
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    input: (styles, state) => {
      return { ...styles, color: palette.text.primary }
    }
  };
};

export const Option = (props) => {
  const { label, innerProps } = props
  return <Box {...innerProps} >
    <components.Option {...props}>
      {label}
    </components.Option>
  </Box >
}

const StandardInputLabel = ({ options }) => {
  const css = { display: "flex", flexDirection: "row", gap: "2px" }
  if (options?.disabled || options?.isDisabled) {
    // css['backgroundColor'] = '#F2F3F2';
    css['px'] = '2px';
  } else if (options?.errors)
    css['color'] = 'red';

  return <Box sx={css}>
    {options?.label}
  </Box>
}

const getLabelBackgroundColor = (props) => {
  if (props.isDisabled)
    return '#F2F3F2'
  else if (props.isFloating && !props.isDisabled)
    return props.palette.background.paper

  return 'transparent'
}

const ReactSelectLabel = styled("div")((props) => ({
  left: "9px",
  pointerEvents: "none",
  position: "absolute",
  transition: "0.2s ease all",
  zIndex: 1,
  top: props.isFloating ? "-10px" : "25%",
  fontSize: props.isFloating ? "0.75rem" : "1rem",
  color: (props.isFloating && props?.isFocused) ? props.palette.primary.main : 'rgba(0, 0, 0, 0.6)',//props.isDisabled ? '#4c4e6461' : "rgba(76, 78, 100, 0.68)",
  paddingRight: "6px",
  paddingLeft: "6px",
  backgroundColor: getLabelBackgroundColor(props),
}));


const Control = (props) => {
  const { palette } = useTheme();
  const { disabled, isDisabled, isRequired, label, errors } = props?.selectProps ?? {};
  return <>
    <ReactSelectLabel isDisabled={props.isDisabled} isFocused={props.isFocused} isFloating={props.isFocused || props.hasValue} palette={palette}>
      <StandardInputLabel options={{ disabled, isDisabled, isRequired, label, errors }} />
    </ReactSelectLabel>
    <components.Control {...props} isFocused={props.isFocused} />
  </>
}


export const ClearIndicator = ({ children, ...props }) => {
  return <Box sx={styles.iconContainer} onClick={() => props?.selectProps?.onClickReset(props)} onMouseDown={(e) => e.stopPropagation()}>
    {props?.hasValue && <Close fontSize={'small'} />}
    {children}
  </Box>
}

const CustomReactSelect = ({ onCreateOption, canCreate, fieldName, setValue = () => { }, control, errors, trigger = () => { }, list = [], customOnChange, options = {}, rules = {}, components = {} }) => {
  const theme = useTheme();

  const commonProps = useMemo(() => {
    const { labelOption = 'name', ...remainingOptions } = options;
    return {
      name: `react-select-${fieldName}`,
      id: `react-select-${fieldName}`,
      options: list,
      menuPortalTarget: document.body,
      menuPlacement: "auto",
      styles: colourStyles(theme?.palette),
      components: { Control, ...components },
      errors: errors[fieldName],
      isClearable: true,
      isSearchable: true,
      placeholder: '',
      cacheOptions: false,
      getOptionLabel: value => value?.[value.__isNew__ ? 'label' : labelOption],
      filterOption: (option, inputValue) => inputValue ? option?.label?.toLowerCase()?.includes(inputValue) : true,
      getOptionValue: o => o?._id ?? o?._id ?? o?.value ?? o?.id,
      ...remainingOptions
    }
  }, [components, errors, fieldName, list, options, theme?.palette])

  const handleChange = useCallback((e, onChange) => {
    onChange(e);
    customOnChange && customOnChange(e?._id);
    trigger(fieldName)
  }, [customOnChange, fieldName, trigger])

  return <FormControl fullWidth>
    <Controller
      name={fieldName}
      control={control}
      rules={{ required: false, rules }}
      render={({ field: { value, onChange } }) => (onCreateOption || canCreate) ?
        <CreatableSelect
          onCreateOption={onCreateOption}
          value={value}
          onChange={e => handleChange(e, onChange)}
          {...commonProps}
        /> :
        <Select
          value={value}
          onChange={e => handleChange(e, onChange)}
          {...commonProps}
        />
      }
    />
    <ShowFieldErrors errors={errors} fieldName={fieldName} />
  </FormControl>
}

export default CustomReactSelect

const RenderItem = ({ value }) => {
  return <Box>
    <Typography>{value}</Typography>
  </Box>
}


const styles = {
  iconContainer: {
    color: 'hsl(0, 0%, 80%)',
    pr: '10px',
    '& :hover': { color: 'hsl(0 0% 60%)' },
    '& :focused': { color: 'hsl(0 0% 20%)' },
    display: 'flex',
    alignItems: 'center'
  },
}
