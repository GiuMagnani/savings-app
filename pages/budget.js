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

const { Option } = Select;
const { TabPane } = Tabs;

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

  const updateFrequency = (category, index, value) => {
    // setBudget({
    //   ...budget,
    //   [category]: budget[category].map((x, i) => {
    //     if (i === index) {
    //       return {
    //         ...x,
    //         frequency: value,
    //       };
    //     }
    //     return x;
    //   }),
    // });
  };

  const updateBudget = (category, index, e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setBudget(
      budget.map(x => {
        if (x.name === category) {
          console.log(x.name, name, value);

          return {
            ...x,
            items: x.items.map((item, itemIndex) => {
              if (itemIndex === index) {
                return {
                  ...item,
                  [name]: value,
                };
              }
              return item;
            }),
          };
        }
        return x;
      })
    );
  };

  const addItem = category => {
    // setBudget({
    //   ...budget,
    //   [category]: [
    //     ...budget[category],
    //     {
    //       description: "a",
    //       price: 1,
    //       quantity: 1,
    //       frequency: "daily",
    //       category: category,
    //     },
    //   ],
    // });
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

  const columns = [
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      render: (text, item, index) => (
        <Input
          defaultValue={text}
          style={{ width: 200 }}
          value={item.description}
          name="description"
          onChange={e => updateBudget(item.category, index, e)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (price, item, index) => (
        <Input
          defaultValue={price}
          value={item.price}
          name="price"
          style={{ width: 100 }}
          onChange={e => updateBudget(item.category, index, e)}
        />
      ),
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, item, index) => (
        <Input
          defaultValue={quantity}
          value={item.quantity}
          name="quantity"
          onChange={e => updateBudget(item.category, index, e)}
        />
      ),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (frequency, item, index) => (
        <Select
          defaultValue={frequency}
          style={{ width: 120 }}
          name="frequency"
          onChange={value => updateFrequency(item.category, index, value)}>
          <Option value="daily">daily</Option>
          <Option value="weekly">weekly</Option>
          <Option value="monthly">monthly</Option>
          <Option value="yearly">yearly</Option>
        </Select>
      ),
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
  ];

  return (
    <div className="App">
      <LayoutWrapper>
        <Button
          type="primary"
          shape="round"
          icon="plus-circle"
          size="small"
          onClick={() => addCategory()}>
          Add New Category
        </Button>
        <Tabs defaultActiveKey="0" type="card">
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
