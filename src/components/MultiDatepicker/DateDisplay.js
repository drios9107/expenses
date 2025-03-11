import { useCallback } from 'react';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Clear'
import moment from 'moment'

const DateDisplayWithoutTheme = ({ selectedDatesTitle, theme, selectedDates, readOnly, onRemoveAtIndex = () => { } }) => {
  const getFormatedDate = useCallback(date => {
    return moment(date).format('ll')
  }, [])

  return (
    <Box
      width={240}
      backgroundColor={theme.palette.background.default}
      flexDirection='column'
      sx={{
        display: { xs: 'none', sm: 'flex' }
      }}
    >
      <Box
        margin={2}
        display='flex'
        alignItems='center'
        alignContent='center'
        justifyContent='space-between'
      >
        <Typography variant='subtitle1'>{selectedDatesTitle}</Typography>
        <Typography variant='subtitle1' color={readOnly ? 'textSecondary' : 'primary'}>
          {selectedDates.length}
        </Typography>
      </Box>
      <List
        dense
        style={{
          flex: '1',
          overflowY: 'auto'
        }}
      >
        {selectedDates.map((date, index) => (
          <ListItem
            key={`${date.toString()}`}
            button={readOnly}
            disabled={readOnly}
            onClick={() => onRemoveAtIndex(index)}
          >
            <ListItemText primary={getFormatedDate(date)} />
            {!readOnly && <DeleteIcon color='error' />}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const DateDisplay = props => (
  <DateDisplayWithoutTheme
    {...props}
    theme={useTheme()}
  />
)

export default DateDisplay
