import { Line } from "react-chartjs-2";
import styled from 'styled-components';
import { addDays, differenceInDays, endOfMonth, format } from "date-fns";
import React from "react";
import groupBy from 'lodash/groupBy';

let defaultDataset = {
  label: 'Amount',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(255,255,255,0)',
  borderColor: 'rgba(255,255,255,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(255,255,255,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(255,255,255,1)',
  pointHoverBorderColor: 'rgba(255,255,255,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: []
};

let defaultOptions = {
  legend: {
    labels: {
      fontColor: "white",
      fontSize: 14
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        fontColor: "white"
      }
    }],
    xAxes: [{
      ticks: {
        fontColor: "white"
      }
    }]
  }
};

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [],
      data: [],
    };
  }

  createLabels = () => {
    const labels = [];
    const startDate = this.props.graphData[0].date;
    const endDate = this.props.graphData[this.props.graphData.length - 1].date;
    const difference = differenceInDays(endOfMonth(endDate), startDate);

    for (let i = 0; i < difference; i++) {
      labels.push(`${ format(addDays(startDate, i), 'dd/MM/yyyy') }`);
    }

    return labels;
  };

  getAmounts = (labels) => {
    let amounts = [];
    let amountReduced = 0;
    let data = this.props.graphData;
    let amountTest = 0;

    data = data.map((item) => {
      amountTest += parseFloat(item.amount);

      return {
        amount: item.amount,
        date: format(item.date, 'dd/MM/yyyy')
      };
    });

    let amountsByDate = groupBy(data, 'date');


    labels.map((label) => {
      let amount = amountReduced;

      if (amountsByDate[label] !== undefined) {
        amountsByDate[label].map((item) => {
          let sum = amount + parseFloat(item.amount);
          sum = parseFloat(sum.toFixed(2));
          amount = sum;
        });
      }

      amountReduced = amount;
      amounts.push(parseFloat(amountReduced));
    });

    return amounts;
  };

  componentDidMount() {
    const labels = this.createLabels();
    const data = this.getAmounts(labels);
    this.setState({
      labels,
      data
    });
  }

  render() {
    return (
      <GraphSection>
        {/*<h2>Graph :)</h2>*/ }
        {
          this.props.graphData.length > 0 && this.state.data.length > 0 && (
            <Line data={ {
              labels: this.state.labels,
              datasets: [{
                ...defaultDataset,
                data: this.state.data
              }
              ]
            } } options={ defaultOptions } />
          )
        }
      </GraphSection>
    );
  }
};

const GraphSection = styled.section`
  width: 100%;
  min-height: 45vh;
  background-color: #0E41DF;
  color: white;
  padding-bottom: 70px;
  margin-bottom: -70px;
`;
