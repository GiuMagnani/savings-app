import React, { useState } from "react";
import LayoutWrapper from "../Layout";
import data from "../data.json";
import { withRouter } from "next/router";
import moment from "moment";
import XLSX from "xlsx";
import { ID } from "../helpers";

function convertDateExcel(excelTimestamp) {
  // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")
  // 2. Convert to milliseconds.
  const secondsInDay = 24 * 60 * 60;
  const excelEpoch = new Date(1899, 11, 31);
  const excelEpochAsUnixTimestamp = excelEpoch.getTime();
  const missingLeapYearDay = secondsInDay * 1000;
  const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
  const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000;
  const parsed = excelTimestampAsUnixTimestamp + delta;
  return isNaN(parsed) ? null : parsed;
}

function checkDuplicate(data, item) {
  return data.some(dataItem => {
    return (
      item.description === dataItem.description &&
      item.subject === dataItem.subject &&
      item.amount === dataItem.amount
    );
  });
}

function setLocalData(data) {
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  //   setData(data);
}

function combineData(data) {
  if (!getLocalStorageData()) return;
  let localStorageData = getLocalStorageData();

  let newData = [];

  // remove duplicates
  data.map(item => {
    if (checkDuplicate(localStorageData, item)) return;

    newData = [...newData, item];
  });

  newData = [...localStorageData, ...newData];

  newData = newData.sort((a, b) => a.date - b.date);

  console.log(newData);

  setState(
    {
      data: newData,
    },
    () => {
      localStorage.setItem("data", JSON.stringify(newData));
    }
  );
}

function clearData() {
  console.log("clear");
  //   setState(
  //     {
  //       data: [],
  //     },
  //     () => localStorage.setItem("data", "")
  //   );
}

function downloadData() {
  if (!getLocalStorageData()) return;

  let a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-u," +
      encodeURIComponent(JSON.stringify(getLocalStorageData()))
  );
  a.setAttribute("download", "savingsAppData");
  a.click();
}

function uploadSavedData(e) {
  const files = e.target.files;
  const file = files[0];
  const reader = new FileReader();

  reader.onload = e => {
    const data = JSON.parse(e.target.result);

    setState(
      {
        data,
      },
      () => {
        localStorage.setItem("data", JSON.stringify(data));
      }
    );
  };

  reader.readAsBinaryString(file);
}

function getLocalStorageData() {
  let data = localStorage.getItem("data");
  if (data === undefined || data === "") return null;
  data = JSON.parse(data);
  // let category = "";
  // data.forEach(item => {
  //   category = "";
  //   switch (item) {
  //     case item.description.toLowerCase().indexOf("supermercato") !== -1:
  //       category = "food";
  //       break;
  //     default:
  //       category = "";
  //   }
  // });
  return data;
}

//   componentDidMount() {
//     if (!getLocalStorageData()) return;

//     setState({
//       data: getLocalStorageData()
//     });
//   }

const Data = ({ router }) => {
  const [data, setData] = useState([]);

  function handleFileUpload(ee, isUpdating) {
    const files = ee.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
        raw: true,
      });
      const a = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[a];

      handleData(XLSX.utils.sheet_to_json(worksheet), isUpdating);
    };

    reader.readAsBinaryString(file);
  }

  function handleData(data, isUpdating) {
    let processedData = [];

    data.map(item => {
      if (item["Importo"] === undefined || item["Causale"] === undefined)
        return;
      let date =
        typeof item["Data valuta"] === "number"
          ? convertDateExcel(item["Data valuta"])
          : item["Data valuta"];
      let amount = item["Importo"];

      date = moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");

      if (typeof amount !== "number") {
        amount = parseFloat(
          amount
            .replace("&euro; ", "")
            .replace(".", "")
            .replace(",", ".")
        );
      } else {
        amount = parseFloat(item["Importo"]);
      }

      processedData = [
        ...processedData,
        {
          key: ID(),
          amount,
          subject: item["Causale"],
          description: item["Descrizione operazione"],
          date,
          tags: [],
        },
      ];
    });

    processedData = processedData.sort((a, b) => a.date - b.date);

    isUpdating ? combineData(processedData) : setLocalData(processedData);
  }

  return (
    <div className="App">
      <LayoutWrapper router={router}>
        <label htmlFor="uploadData">Upload data</label>
        <input
          id="uploadData"
          type="file"
          onChange={e => handleFileUpload(e, false)}
        />
        <br />
        <label htmlFor="updateData">Update data</label>
        <input
          id="updateData"
          type="file"
          onChange={e => handleFileUpload(e, true)}
        />
        <br />
        <label htmlFor="uploadSavedData">Upload saved data</label>
        <input id="uploadSavedData" type="file" onChange={uploadSavedData} />
        <br />
        <button onClick={clearData}>Clear Data</button>
        <br />
        <button onClick={downloadData}>Download Data</button>
      </LayoutWrapper>
    </div>
  );
};

export default withRouter(Data);
