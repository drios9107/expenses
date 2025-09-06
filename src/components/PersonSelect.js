import CustomReactSelect from './inputs/CustomReactSelect';

const PersonSelect = ({ control, errors, list = [], options = {} }) => {
    return <CustomReactSelect
        control={control}
        rules={{ required: true }}
        errors={errors}
        list={list}
        fieldName={'person'}
        options={options}
    />
}

export default PersonSelect