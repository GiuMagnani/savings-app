import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import LayoutWrapper from "../Layout";
import TableWrapper from "../components/TableWrapper";
import TotalsWrapper from "../components/TotalsWrapper";
import PieExpenses from "../components/PieExpenses";
import DatePicker from "../components/DatePicker";

export default () => {
  return (
    <div className="App">
      <LayoutWrapper>
        <DatePicker />
        <TotalsWrapper />
        <Row gutter={15}>
          <Col span={24}>
            <Card size="small" title="Recent Transactions">
              <TableWrapper />
            </Card>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col span={24}>
            <Card size="small" title="Top Spending Categories">
              <PieExpenses />
            </Card>
          </Col>
        </Row>
      </LayoutWrapper>
    </div>
  );
};
