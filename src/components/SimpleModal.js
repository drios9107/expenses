import React from 'react'
// ** MUI Imports
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import CloseFormButton from './CloseFormButton';
import Loader from './Loader';

const SimpleModal = ({ title = '', onClose, maxWidth = "sm", extraclasses, children, isLoading }) => {
    return <Dialog
        disableScrollLock
        maxWidth={maxWidth}
        fullWidth
        onClose={onClose}
        open
        sx={extraclasses}
    >
        <DialogTitle sx={{ mx: "auto", textAlign: "center" }}>
            <Typography variant="h5" component="span" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <CloseFormButton onClick={onClose} />
        </DialogTitle>
        <DialogContent sx={{ py: '10px' }}>
            {children}
            {isLoading && <Loader isLoading />}
        </DialogContent>
    </Dialog>
};

export default SimpleModal;
