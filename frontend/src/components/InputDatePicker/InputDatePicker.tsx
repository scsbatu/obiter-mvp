import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./inputDate.scss"

interface InputDatePickerProps {
  labelName?: string;
  customLabelText?: string;
  customGridMain?: string;
  customGridColumn?: string;
  changeDate: (date: Date | null, event?: React.SyntheticEvent<any> | undefined) => void;
  currentSelectedData?: Date | null;
}

export const InputDatePicker: React.FC<InputDatePickerProps> = ({
  labelName,
  customLabelText = "",
  customGridMain = "",
  customGridColumn = "",
  changeDate,
  currentSelectedData = null
}) => {
  return (
<div className={`w-full ${customGridMain}`}>
  {labelName && (
    <label className={`block text-sm font-medium text-white-700 mb-1 ${customLabelText}`}>
      {labelName}
    </label>
  )}

  <div className={`w-full ${customGridColumn}`}>
    <DatePicker
      selected={currentSelectedData}
      onChange={(date: Date | null, event) => changeDate(date, event)}
  className="block w-full rounded-sm border border-gray-300 shadow-sm p-2 text-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      dateFormat="yyyy-MM-dd"
    />
  </div>
</div>

  );
};
