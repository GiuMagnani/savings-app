import React from "react";
import { Row, Col, Card, Statistic, Progress } from "antd";
import data from "../data.json";
import { getMonth, format, parse } from "date-fns";
import { Bar } from "react-chartjs-2";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const income = months.map((i) => {
  return data
    .filter(x => getMonth(parse(x.date, "dd/MM/yyyy", new Date())) === i)
    .filter(xx => xx.amount >= 0)
    .reduce((total, num) => total + num.amount, 0);
});

const expenses = months.map((i) => {
  return data
    .filter(x => getMonth(parse(x.date, "dd/MM/yyyy", new Date())) === i)
    .filter(xx => xx.amount < 0)
    .reduce((total, num) => total + num.amount * -1, 0);
});

var dada = {
  labels: months,
  datasets: [
    {
      label: "Income",
      backgroundColor: "#87d068",
      data: income
    },
    {
      label: "Expenses",
      backgroundColor: "red",
      data: expenses
    }
  ]
};

export default () => {
  return (
    <Col span={24}>
      {/* <Bar data={dada} height={100} width={100}/> */}
    </Col>
  );
};
