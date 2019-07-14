import React, { useState } from "react";
import { Row, Col, Card, Statistic } from "antd";
import LayoutWrapper from "../Layout";
import TableWrapper from "../components/TableWrapper";
import TotalsWrapper from "../components/TotalsWrapper";
import PieExpenses from "../components/PieExpenses";
import DatePicker from "../components/DatePicker";
import { withRouter } from "next/router";
import moment from "moment";

const startOfMonth = moment().startOf("month");
const endOfMonth = moment().endOf("month");

  console.log();

const New = (props) => {
  const [datePeriod, setDatePeriod] = useState("01/01/2019");

  console.log(moment());

  function handleDatePeriod(date, dateString) {
    console.log(date, dateString);
    setDatePeriod(date);
  }

  return (
    <div className="App">
      <LayoutWrapper router={props.router}>
        <DatePicker
          datePeriod={datePeriod}
          handleDatePeriod={handleDatePeriod}
        />
        <TotalsWrapper datePeriod={datePeriod} />
        <Row gutter={15} style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <Card size="small" title="Recent Transactions">
              <TableWrapper />
            </Card>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={12}>
            <Card size="small" title="Top Spending Categories">
              <PieExpenses />
            </Card>
          </Col>
        </Row>
      </LayoutWrapper>
    </div>
  );
};

export default withRouter(New)