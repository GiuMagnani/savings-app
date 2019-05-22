import React from "react";
import { Pie } from "react-chartjs-2";
import data from "../data.json";
import _ from "lodash";
import { randomColorGenerator } from "../helpers";

const labels = _.uniq(data.map(x => x.tags[0]));
const dataF = labels.map(x => {
  return data.reduce((total, num) => {
    return num.tags[0] === x ? total + num.amount : total;
  }, 0);
});
console.log(dataF);

const dataP = {
  datasets: [
    {
      data: dataF,
      backgroundColor: labels.map(x => randomColorGenerator()),
    },
  ],
  labels,
};

export default () => {
  return <Pie data={dataP} height={150} width={150} />;
};
