import CustomReactSelect from './inputs/CustomReactSelect';

const SubCategorySelect = ({ onCreateCategory, control, errors, list = [], options = {} }) => {

    return <CustomReactSelect
        control={control}
        rules={{ required: true }}
        errors={errors}
        list={list}
        fieldName={'subCategory'}
        onCreateOption={onCreateCategory}
        {...options}
    />
}

export default SubCategorySelect