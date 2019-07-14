import React from "react";
import LayoutWrapper from "../Layout";
import { Table, Tag, Badge } from "antd";
import data from "../data.json";
import { formatNumber } from "../helpers";
import { withRouter } from "next/router";

const columns = [
  {
    dataIndex: "amount",
    key: "amountBadge",
    rowKey: "amountBadge",
    render: amount => <Badge status={amount >= 0 ? "success" : "error"} />,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    rowKey: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    rowKey: "amount",
    render: amount => <span>{formatNumber(amount)}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    rowKey: "date",
  },
  {
    title: "Category",
    key: "tags",
    rowKey: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        <Tag color={tags[0].length < 5 ? "geekblue" : "green"}>
          {tags[0].toUpperCase()}
        </Tag>
      </span>
    ),
  },
  {
    title: "Action",
    key: "action",
    rowKey: "action",
    render: (text, record) => (
      <span>
        <a>Edit</a>
      </span>
    ),
  },
];

const Transactions = ({router}) => {
  return (
      <div className="App">
      <LayoutWrapper router={router}>
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      expandedRowRender={record => (
        <p style={{ margin: 0 }}>{record.description}</p>
      )}
    />
    </LayoutWrapper>
    </div>
  );
};

export default withRouter(Transactions);