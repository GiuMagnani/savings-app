import { useState } from "react";
import {
  InputNumber,
  Input,
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Badge,
  Select,
} from "antd";
import LayoutWrapper from "../Layout";
import budgetData from "../budget.json";
import { formatNumber, parseLocaleNumber } from "../helpers";

const { Option } = Select;

export default () => {
  const [budget, setBudget] = useState(budgetData);

  const getDailyPrice = item => {
    let value = 0;

    switch (item.frequency) {
      case "daily":
        value = item.price * item.quantity;
        break;
      case "weekly":
        value = (item.price * item.quantity) / 7;
        break;
      case "monthly":
        value = (item.price * item.quantity) / (365 / 12);
        break;
      case "yearly":
        value = (item.price * item.quantity) / 365;
        break;
      default:
        value = item.price * item.quantity;
        break;
    }
    return value;
  };

  const priceInput = price => {
    return <InputNumber defaultValue={price} />;
  };

  const quantityInput = price => {
    return <InputNumber defaultValue={price} />;
  };

  const frequencySelect = frequency => {
    return (
      <Select defaultValue={frequency} style={{ width: 120 }}>
        <Option value="daily">daily</Option>
        <Option value="weekly">weekly</Option>
        <Option value="monthly">monthly</Option>
        <Option value="yearly">yearly</Option>
      </Select>
    );
  };

  const updateBudget = (category, index, e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    console.log(category, index);

    const updatedValue = {
      ...budget[category][index],
      [name]: value,
    };

    setBudget({
      ...budget,
      [category]: [
        ...budget[category],
        ([budget[category][index]] = updatedValue),
      ],
    });
  };

  const columns = [
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, item, index) => (
        <Input
          value={text}
          onChange={e => updateBudget(item.category, index, e)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: priceInput,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: quantityInput,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: frequencySelect,
    },
    {
      title: "Daily",
      dataIndex: "priceDaily",
      key: "priceDaily",
      render: (text, item) => <span>{formatNumber(getDailyPrice(item))}</span>,
    },
    {
      title: "Weekly",
      dataIndex: "priceWeekly",
      key: "priceWeekly",
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * 7)}</span>
      ),
    },
    {
      title: "Monthly",
      dataIndex: "priceMonthly",
      key: "priceMonthly",
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * (365 / 12))}</span>
      ),
    },
    {
      title: "Yearly",
      dataIndex: "priceYearly",
      key: "priceYearly",
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * 365)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a>Edit</a>
        </span>
      ),
    },
  ];

  return (
    <div className="App">
      <LayoutWrapper>
        {Object.keys(budget).map(category => {
          return (
            <>
              {category}
              <Table
                columns={columns}
                dataSource={budget[category]}
                size="small"
              />
            </>
          );
        })}
      </LayoutWrapper>
    </div>
  );
};
