import React, {useState} from 'react'
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";

import "react-datepicker/dist/react-datepicker.css";



export default function PickDate({ startDate, setStartDate, endDate, setEndDate }) {
  registerLocale("fr", fr);
  const year = { year: "numeric"};
  const dayOnly = {weekday: "long"}
  const dayNumber = {day: "2-digit"}
  const dayMonth = { month: "short"};
  const options = { weekday: "long",year: "numeric", month: "long", day: "2-digit"};


  const [newStartDate, setNewStartDate] = useState(DateTime.now())

  const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      // console.log("dataPicker",DateTime.fromObject(startDate) ,endDate)
      // console.log(start.toLocaleDateString("fr-FR", options))
      // console.log(DateTime.fromObject(end).setLocale('fr').toFormat('dd MMMM yyyy'))
      // addSeven()
      // console.log("end=>", endDate, "start=>", startDate);
      // console.log("plus=>",DateTime.fromJSDate(start).plus({ days: 7 }));
      // console.log("moins=>",DateTime.fromJSDate(start).minus({ days: 7 }));
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
