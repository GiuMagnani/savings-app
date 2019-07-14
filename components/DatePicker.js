import React, { useState } from "react";
import { Select, DatePicker } from "antd";
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default ({ datePeriod, handleDatePeriod }) => {
  const [dateType, setDateType] = useState("month");

  return (
    <div style={{ marginBottom: "10px" }}>
      <Select
        defaultValue={dateType}
        onChange={value => setDateType(value)}
        style={{ marginRight: "10px" }}>
        <Option value="date">Date</Option>
        <Option value="month">Month</Option>
        <Option value="range">Range</Option>
        <Option value="week">Week</Option>
      </Select>
      {dateType === "date" && <DatePicker onChange={(date, dateString) => handleDatePeriod(date, dateString)} />}
      {dateType === "month" && (
        <MonthPicker onChange={(date, dateString) => handleDatePeriod(date, dateString)} placeholder="Select month" />
      )}
      {dateType === "range" && <RangePicker onChange={(date, dateString) => handleDatePeriod(date, dateString)} />}
      {dateType === "week" && (
        <WeekPicker onChange={(date, dateString) => handleDatePeriod(date, dateString)} placeholder="Select week" />
      )}
    </div>
  );
};
