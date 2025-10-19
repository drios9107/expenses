import CustomReactSelect from './inputs/CustomReactSelect';

const UserSelect = ({ control, errors, list = [], options = {} }) => {
    return <CustomReactSelect
        control={control}
        rules={{ required: true }}
        errors={errors}
        list={list}
        fieldName={'user'}
        options={options}
    />
}

export default UserSelect