import React from "react";
import { Row, Col, Card, Statistic, Progress } from "antd";
import data from "../data.json";
import { formatNumber } from "../helpers";
import Charts from "./Charts";

export default (props) => {
  console.log(props);

console.log(data);




  const income = data.reduce((total, x) => {
    return x.amount > 0 ? total + x.amount : total;
  }, 0);

  const expenses = data.reduce((total, x) => {
    return x.amount < 0 ? total + x.amount : total;
  }, 0);

  return (
    <Row style={{ marginBottom: "15px", display: "flex" }} gutter={15}>
      <Col span={12}>
        <Card
          size="small"
          title="Current Month Status"
          style={{ height: "100%" }}
          bodyStyle={{
            height: "320px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <Row
            type="flex"
            justify="center"
            gutter={30}
            style={{
              width: "100%"
            }}>
            <Col span={24}>
              <Statistic
                title="Income"
                value={formatNumber(income)}
                precision={2}
              />
              <Progress
                strokeColor="#87d068"
                percent={Math.floor((income * 100) / 3000)}
                size="small"
              />
              {formatNumber(income)}/ <strong>{formatNumber(3000)}</strong>
            </Col>
            <Col span={24} style={{ marginTop: "30px"}}>
              <Statistic
                title="Expenses"
                value={formatNumber(expenses)}
                precision={2}
              />
              <Progress
                strokeColor="red"
                percent={Math.floor((expenses * 100) / -1500)}
                size="small"
              />
              {formatNumber(expenses * -1)}/
              <strong>{formatNumber(1500)}</strong>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card size="small" title="Budget">
          <Row gutter={15}>
            <Charts />
            {/* <Col span={12}>
              <Chart width={"100%"} height={300} data={data} scale={cols}>
                <Axis name="genre" />
                <Axis name="sold" />
                <Legend position="top" dy={-20} />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
              </Chart>
            </Col> */}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
