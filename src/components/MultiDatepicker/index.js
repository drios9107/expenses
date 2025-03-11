import Calendar from './Calendar'


const MultiDatepicker = ({
  readOnly,
  disableWeekends,
  disabledDates,
  minDate,
  maxDate,
  onSelected,
  selectedDates,
  selectedDatesTitle = 'Selected Dates',
  extraclasses = {}
}) => {
  return <Calendar
    selectedDates={selectedDates}
    onSelect={onSelected}
    readOnly={readOnly}
    minDate={minDate}
    maxDate={maxDate}
    disableWeekends={disableWeekends}
    disabledDates={disabledDates}
    selectedDatesTitle={selectedDatesTitle}
    extraclasses={extraclasses}
  />
}

export default MultiDatepicker
