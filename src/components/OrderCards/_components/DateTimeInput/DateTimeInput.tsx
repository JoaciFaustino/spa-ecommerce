"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateTimeInput.module.scss";
import { ptBR } from "date-fns/locale";
import { isSameDay } from "date-fns";
import { formatDateTimeString } from "@/utils/dateUtils";

type Props = {
  minDate: Date;
  maxDate: Date;
  dateSelected: Date | null;
  onChangeDate: (date: Date | null) => void;
};

function DateTimeInput({
  dateSelected,
  maxDate,
  minDate,
  onChangeDate
}: Props) {
  const dateString = dateSelected
    ? formatDateTimeString(dateSelected)
    : "--/--/----, --:--";

  return (
    <DatePicker
      customInput={<input type="button" />}
      value={dateString}
      selected={dateSelected}
      onChange={onChangeDate}
      className={styles.datePicker}
      calendarClassName={styles.calendar}
      wrapperClassName={styles.inputWrapper}
      dayClassName={(date) => {
        const isSelected = dateSelected && isSameDay(dateSelected, date);

        return `${styles.day} ${isSelected ? styles.daySelected : ""}`;
      }}
      timeClassName={(date) => {
        const isSelected =
          dateSelected &&
          dateSelected.getHours() === date.getHours() &&
          dateSelected.getMinutes() === date.getMinutes();

        return `${styles.time} ${isSelected ? styles.timeSelected : ""}`;
      }}
      id="date-time-input"
      locale={ptBR}
      minDate={minDate}
      maxDate={maxDate}
      disabledKeyboardNavigation
      shouldCloseOnSelect={false}
      isWeekDisabled
      showTimeSelect
    />
  );
}

export default DateTimeInput;
