import React, { useState } from "react";
import { Select, DatePicker } from "antd";
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default () => {
  const [dateType, setDateType] = useState("month");

  return (
    <div>
      <Select defaultValue={dateType} onChange={value => setDateType(value)}>
        <Option value="date">Date</Option>
        <Option value="month">Month</Option>
        <Option value="range">Range</Option>
        <Option value="week">Week</Option>
      </Select>
      {dateType === "date" && <DatePicker onChange={onChange} />}
      {dateType === "month" && (
        <MonthPicker onChange={onChange} placeholder="Select month" />
      )}
      {dateType === "range" && <RangePicker onChange={onChange} />}
      {dateType === "week" && (
        <WeekPicker onChange={onChange} placeholder="Select week" />
      )}
    </div>
  );
};
