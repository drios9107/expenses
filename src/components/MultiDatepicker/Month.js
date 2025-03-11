import React, { useCallback } from 'react'
import moment from 'moment'
import Week from './Week'
import { defaultUtils as utils } from './dateUtils'

const Weeks = ({ displayDate, selectedDates, disabledDates, disableWeekends, onSelect, minDate, maxDate, readOnly }) => {

  const renderWeeks = useCallback(() => {
    const weekArray = utils.getWeekArray(
      displayDate,
      moment.localeData().firstDayOfWeek()
    )

    return weekArray.map((s, i) => <Week
      key={i}
      week={s}
      selectedDates={selectedDates}
      disabledDates={disabledDates}
      displayDate={displayDate}
      disableWeekends={disableWeekends}
      onSelect={onSelect}
      minDate={minDate}
      maxDate={maxDate}
      readOnly={readOnly}
    />)
  }, [disableWeekends, disabledDates, displayDate, maxDate, minDate, onSelect, readOnly, selectedDates])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      lineHeight: '1.25',
      position: 'relative'
    }}>
      {renderWeeks(displayDate)}
    </div>
  )
}

export default Weeks
