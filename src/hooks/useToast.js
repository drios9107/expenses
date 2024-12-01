import CloseFormButton from '@/components/CloseFormButton';
import React, { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useToast = () => {
    const duration = 3000

    const toastInfo = useCallback((message, options = {}) => {
        toast.success(message, { duration, ...options })
    }, []);

    const toastError = useCallback((message, options = {}) => {
        toast.error(message, { duration, ...options })
    }, []);

    const toastComponent = useCallback((component, { duration = 10000, id, style = {} }) => {
        toast(t => <>
            <CloseFormButton onClick={() => toast.dismiss(id)} extraclasses={{ right: '5px', top: '5px' }} iconExtraclasses={{ height: '10px', width: '10px' }} />
            {component}
        </>, {
            id,
            duration,
            style: {
                maxWidth: 'unset',
                width: '40%',
                height: 'fit-content',
                ...style
            },
        })
    }, []);

    return { toastInfo, toastError, toastComponent }
}
