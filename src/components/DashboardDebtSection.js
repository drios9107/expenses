import { Grid2, Paper, Typography } from '@mui/material';
import { fadeInStyles } from '@/utils/helpers';
import IncomeExpensesContainer from './IncomeExpensesContainer';
import InDevelopmentBadge from './InDevelopmentBadge';


const DashboardDebtSection = ({ t, conditionalContainerStyles, personsDebt = [] }) => {

    return <Paper sx={[conditionalContainerStyles, styles.paper]} >
        <InDevelopmentBadge />
        <Grid2 container spacing={2} sx={[fadeInStyles(), { minWidth: '250px' }]}>
            {personsDebt.map(i => <Grid2
                key={i?.person?._id}
                size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                sx={{ justifySelf: 'flex-end' }}
            >
                <IncomeExpensesContainer
                    title={i?.person?.name}
                    leftSide={Object.keys(i?.debts).map(d => <Typography key={d} variant='body2' sx={{ userSelect: 'none' }}>{d}</Typography>)}
                    rightSide={Object.values(i?.debts).map(d => <Typography key={d} variant='body2' sx={{ userSelect: 'none', fontWeight: 600, textAlign: 'right' }}>{d} $</Typography>)}
                />
            </Grid2>)}
        </Grid2>
    </Paper>
}

export default DashboardDebtSection

const borderColor = 'rgb(169 212 250)';
const styles = {
    paper: { display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative' },
    monthNavigatorContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80px', flex: 1 },
    blinkingButton: {
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
        position: 'relative',
        overflow: 'visible',
        margin: '6px',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            right: '-6px',
            bottom: '-6px',
            border: `2px solid ${borderColor}`,
            borderRadius: 'inherit',
            animation: 'blink 1.5s infinite',
            pointerEvents: 'none',
            zIndex: 1,
        },
        '@keyframes blink': {
            '0%': {
                opacity: 1,
                transform: 'scale(1)',
            },
            '50%': {
                opacity: 0,
                transform: 'scale(1.05)',
            },
            '100%': {
                opacity: 1,
                transform: 'scale(1)',
            },
        }
    },
}