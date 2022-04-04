import React from 'react'

import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";
import './pickDate.scss'



export default function PickDate({ startDate, setStartDate, endDate, setEndDate }) {
  registerLocale("fr", fr);

  const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
  };
  return (
    <DatePicker
    locale={fr}
    onChange={onChange}
    startDate={startDate}
    endDate={endDate}
    selectsRange
    inline
  />
  )
}
