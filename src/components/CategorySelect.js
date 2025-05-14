import CustomReactSelect from './inputs/CustomReactSelect';

const CategorySelect = ({ onCreateCategory, control, errors, list = [], options = {} }) => {

    return <CustomReactSelect
        control={control}
        rules={{ required: true }}
        errors={errors}
        list={list}
        fieldName={'category'}
        onCreateOption={onCreateCategory}
        {...options}
    />
}

export default CategorySelect