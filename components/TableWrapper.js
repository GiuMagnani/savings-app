import React from "react";
import { Table, Tag, Badge } from "antd";
import data from "../data.json";
import { formatNumber } from "../helpers";

const columns = [
  {
    dataIndex: "amountBadge",
    render: amount => <Badge status={amount >= 0 ? "success" : "error"} />
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: amount => <span>{formatNumber(amount)}</span>
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "Category",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        <Tag color={tags[0].length < 5 ? "geekblue" : "green"}>
          {tags[0].toUpperCase()}
        </Tag>
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Edit</a>
      </span>
    )
  }
];

const TableWrapper = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      expandedRowRender={record => (
        <p style={{ margin: 0 }}>{record.description}</p>
      )}
    />
  );
};

export default TableWrapper;
