import { useState } from "react";
import {
  InputNumber,
  Icon,
  Button,
  Tabs,
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
import { withRouter } from "next/router";

const { Option } = Select;
const { TabPane } = Tabs;

const Budget = ({router}) => {
  const [budget, setBudget] = useState(budgetData);
  const [activeTab, setActiveTab] = useState("0");

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

  const updateFrequency = (currentIndex, value) => {
    setBudget(
      budget.map((category, categoryIndex) => {
        if (categoryIndex === Number(activeTab)) {
          return {
            ...category,
            items: category.items.map((item, index) => {
              if (index === currentIndex) {
                return {
                  ...item,
                  frequency: value,
                };
              }
              return item;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateQuantity = (currentIndex, value) => {
    setBudget(
      budget.map((category, categoryIndex) => {
        if (categoryIndex === Number(activeTab)) {
          return {
            ...category,
            items: category.items.map((item, index) => {
              if (index === currentIndex) {
                return {
                  ...item,
                  quantity: value,
                };
              }
              return item;
            }),
          };
        }
        return category;
      })
    );
  };

  const updateBudget = (currentIndex, e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setBudget(
      budget.map((category, categoryIndex) => {
        if (categoryIndex === Number(activeTab)) {
          return {
            ...category,
            items: category.items.map((item, index) => {
              if (index === currentIndex) {
                return {
                  ...item,
                  [name]: value,
                };
              }
              return item;
            }),
          };
        }
        return category;
      })
    );
  };

  const addItem = categoryName => {
    setBudget(
      budget.map(category => {
        if (category.name === categoryName) {
          return {
            ...category,
            items: [
              ...category.items,
              {
                description: "",
                price: 0,
                quantity: 0,
                frequency: "daily",
              },
            ],
          };
        }
        return category;
      })
    );
  };

  const addCategory = () => {
    setBudget([
      ...budget,
      {
        name: `Category ${Object.keys(budget).length + 1}`,
        items: [
          {
            description: "a",
            price: 1,
            quantity: 1,
            frequency: "daily",
            category: `Category ${Object.keys(budget).length + 1}`,
          },
        ],
      },
    ]);
  };

  const editCategory = (category, e) => {
    const newCategoryName = e.target.value;
    setBudget(
      budget.map(x => {
        if (x.name === category) {
          return { ...x, name: newCategoryName };
        }
        return x;
      })
    );
  };

  const getTotalQuantity = () => {
    return budget[activeTab].items.reduce((total, item) => total + item.quantity, 0);
  };

  const columns = [
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text, item, index) => (
        <Input
          defaultValue={text}
          value={item.description}
          name="description"
          onChange={e => updateBudget(index, e)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (price, item, index) => (
        <Input
          defaultValue={price}
          value={item.price}
          maxLength="6"
          name="price"
          onChange={e => updateBudget(index, e)}
        />
      ),
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      totals: true,
      width: 100,
      render: (quantity, item, index) => (
        <InputNumber
          defaultValue={quantity}
          value={item.quantity}
          maxLength="3"
          name="quantity"
          onChange={e => updateQuantity(index, e)}
        />
      ),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      width: 120,
      render: (frequency, item, index) => (
        <Select
          defaultValue={frequency}
          name="frequency"
          style={{ width: 120 }}
          onChange={value => updateFrequency(index, value)}>
          <Option value="daily">daily</Option>
          <Option value="weekly">weekly</Option>
          <Option value="monthly">monthly</Option>
          <Option value="yearly">yearly</Option>
        </Select>
      ),
    },
    {
      title: "Daily",
      dataIndex: "daily",
      key: "daily",
      totals: true,
      width: 100,
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item))}</span>
      ),
    },
    {
      title: "Weekly",
      dataIndex: "weekly",
      totals: true,
      width: 100,
      key: "weekly",
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * 7)}</span>
      ),
    },
    {
      title: "Monthly",
      dataIndex: "monthly",
      key: "monthly",
      totals: true,
      width: 100,
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * (365 / 12))}</span>
      ),
    },
    {
      title: "Yearly",
      dataIndex: "yearly",
      key: "yearly",
      totals: true,
      width: 100,
      render: (text, item) => (
        <span>{formatNumber(getDailyPrice(item) * 365)}</span>
      ),
    },
  ];

  const getTotal = () => {
    return {
      daily: budget[activeTab].items.reduce(
        (total, num) => total + getDailyPrice(num),
        0
      ),
      monthly: budget[activeTab].items.reduce(
        (total, num) => total + getDailyPrice(num) * 7,
        0
      ),
      weekly: budget[activeTab].items.reduce(
        (total, num) => total + getDailyPrice(num) * (365 / 12),
        0
      ),
      yearly: budget[activeTab].items.reduce(
        (total, num) => total + getDailyPrice(num) * 365,
        0
      ),
    };
  };

  const totalsFooter = columns => (
    <div className="ant-table ant-table-default">
      <table>
        <thead className="ant-table-thead">
          <tr>
            {columns.map(item => (
              <th key={item.dataIndex} style={{ width: item.width }}>
                {item.totals
                  ? item.dataIndex === "quantity"
                    ? getTotalQuantity()
                    : formatNumber(getTotal()[item.dataIndex])
                  : "-"}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <style>{`.ant-table-footer{padding: 0px;}`}</style>
    </div>
  );

  return (
    <div className="App">
      <LayoutWrapper router={router}>
        <Button
          type="primary"
          shape="round"
          icon="plus-circle"
          size="small"
          onClick={() => addCategory()}>
          Add New Category
        </Button>
        <Tabs
          defaultActiveKey={activeTab}
          type="card"
          onChange={activeKey => setActiveTab(activeKey)}>
          {budget.map((category, index) => {
            return (
              <TabPane
                key={index}
                tab={
                  <span>
                    <Input
                      size="small"
                      style={{ width: 100 }}
                      maxLength={15}
                      value={category.name}
                      onChange={e => editCategory(category.name, e)}
                    />
                  </span>
                }>
                <Table
                  pagination={false}
                  columns={columns}
                  rowKey={index}
                  dataSource={category.items}
                  size="small"
                  footer={() => totalsFooter(columns)}
                />
                <Button
                  type="primary"
                  shape="round"
                  size="small"
                  onClick={() => addItem(category.name)}>
                  <Icon type="plus-circle" /> Add new item
                </Button>
              </TabPane>
            );
          })}
        </Tabs>
      </LayoutWrapper>
    </div>
  );
};

export default withRouter(Budget);