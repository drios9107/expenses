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

const styles = {
    graph: { height: '300px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}