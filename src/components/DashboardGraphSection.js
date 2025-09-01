import { Grid2, Paper } from '@mui/material';
import { fadeInStyles } from '@/utils/helpers';
import DashboardBarGraph from './graphs/DashboardBarGraph';
import DashboardPieGraph from './graphs/DashboardPieGraph';

const DashboardGraphSection = ({ conditionalGraphStyles, isHover1, setIsHover1,
    currentMonth, currentYear, isHover2, setIsHover2 }) => {

    return <Grid2 container spacing={2} sx={fadeInStyles()}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover1 ? 3 : 1} onMouseEnter={() => setIsHover1(true)} onMouseLeave={() => setIsHover1(false)}>
                <DashboardBarGraph currentMonth={currentMonth} currentYear={currentYear} />
            </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
            <Paper sx={[styles.graph, conditionalGraphStyles]} elevation={isHover2 ? 3 : 1} onMouseEnter={() => setIsHover2(true)} onMouseLeave={() => setIsHover2(false)}>
                <DashboardPieGraph currentMonth={currentMonth} currentYear={currentYear} />
            </Paper>
        </Grid2>
    </Grid2>
}

export default DashboardGraphSection

const borderColor = 'rgb(169 212 250)';
const styles = {
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