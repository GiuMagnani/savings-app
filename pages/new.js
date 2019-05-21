import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import "antd/dist/antd.css";
import LayoutWrapper from "../Layout";
import TableWrapper from "../components/TableWrapper";
import Totals from "../components/TotalsWrapper";

export default () => {
    return (
        <div className="App">
            <LayoutWrapper>
                <Totals />
                <Row gutter={15}>
                    <Col span={24}>
                        <Card size="small" title="Recent Transactions">
                            <TableWrapper />
                        </Card>
                    </Col>
                </Row>
            </LayoutWrapper>
        </div>
    );
}
