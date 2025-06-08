import { Box } from "@mui/material";


const ChartContainer = ({ children }) => {
    return <Box sx={styles.chartContainer}>
        {children}
    </Box>
}

export default ChartContainer

const styles = {
    chartContainer: {
        position: 'relative',
        width: 'min(90%,400px)',
        minWidth: '0'
    }
}