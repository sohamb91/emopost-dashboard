import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const DateRangePicker = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      dropdownMode="select"
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
        onDateChange(update);
      }}
      isClearable
      popperClassName="date-picker-reports"
    />
  );
};

export default DateRangePicker;
