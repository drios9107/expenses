import MuiTextfield from '@/components/inputs/MuiTextField'
import SimpleModal from '@/components/SimpleModal'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from 'react';
import { useCategory, useSubCategory } from '@/hooks'
import MuiSingleSelectField from '@/components/inputs/MuiSingleSelectField'



const schema = yup.object().shape({
    name: yup.string().required("This field is required"),
    category: yup.string().required("This field is required"),
});

const defaultValues = { name: "" }

const Form = ({ item, onClose = () => { } }) => {
    const { categories } = useCategory();
    const { isLoading, createSubCategory, updateSubCategory } = useSubCategory();

    const { control, handleSubmit, formState: { errors, isDirty, isValid }
    } = useForm({ defaultValues: item ?? defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

    const onSubmit = useCallback(preparedData => {
        item ?
            updateSubCategory(preparedData) :
            createSubCategory(preparedData);
        onClose();
    }, [createSubCategory, item, onClose, updateSubCategory])

    return <SimpleModal onClose={onClose} title={item ? 'Edit' : 'Create'} isLoading={isLoading}>
        <Box sx={styles.container}>
            <Box sx={[styles.container, {}]} >
                <MuiTextfield
                    control={control}
                    errors={errors}
                    fieldName={'name'}
                    options={{ label: 'Name' }}
                />
            </Box>
            <Box sx={styles.container}>
                <MuiSingleSelectField
                    control={control}
                    errors={errors}
                    fieldName={'category'}
                    options={{ label: 'Category' }}
                    list={categories}
                />
            </Box>
            <Box sx={styles.actionsContainer}>
                <Button variant='outlined' onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit(onSubmit)}> Save </Button>
            </Box>
        </Box>
    </SimpleModal >
}

export default Form

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '25px', pt: '10px' },
    actionsContainer: { display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' },
}