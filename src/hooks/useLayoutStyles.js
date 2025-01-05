import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';

export const useLayoutStyles = () => {
    const isMobile = useMediaQuery("@media (max-width:500px)");

    const conditionalContainerStyles = useMemo(() => {
        return isMobile ? { gap: '10px', px: '10px' } : { gap: '25px', px: '25px' }
    }, [isMobile])

    const conditionalTopSectionStyles = useMemo(() => {
        return isMobile ?
            { borderBottomRightRadius: '8px', borderBottomLeftRadius: '8px', px: '8px' } :
            { borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px', px: '16px' }
    }, [isMobile])

    const conditionalMiddleSectionStyles = useMemo(() => {
        return isMobile ? { gap: '10px' } : { gap: '25px' }
    }, [isMobile])

    const conditionalMenuStyles = useMemo(() => {
        return isMobile ? { py: '10px' } : { py: '25px' }
    }, [isMobile])

    const conditionalFooterSectionStyles = useMemo(() => {
        return isMobile ? { borderTopRightRadius: '8px', borderTopLeftRadius: '8px', px: '10px' } : { borderTopRightRadius: '16px', borderTopLeftRadius: '16px', px: '25px' }
    }, [isMobile])

    return { conditionalContainerStyles, conditionalTopSectionStyles, conditionalMiddleSectionStyles, conditionalMenuStyles, conditionalFooterSectionStyles }
}
