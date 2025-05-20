import { useTranslation } from '@/hooks/useTranslation';
import { Box, IconButton, MenuItem, Tooltip } from '@mui/material';
import { useParams } from 'next/navigation';

const MenuAction = ({ onClick, useMobileView, children }) => {
    const { lng } = useParams()
    const { t } = useTranslation(lng ?? 'en', 'common')


    return <Box onClick={onClick} >
        {useMobileView ?
            <Tooltip title={useMobileView ? t('bigMenu') : t('smallMenu')}>
                <IconButton>{children}</IconButton>
            </Tooltip> :
            <MenuItem sx={{ alignSelf: 'right', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                {children} {t('smallMenu2')}
            </MenuItem>}
    </Box>
}

export default MenuAction