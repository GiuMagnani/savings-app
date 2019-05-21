import React from "react";
import XLSX from 'xlsx';
import styled from 'styled-components';
import "../styles/reset.css";
import "../styles/style.css";
import Graph from "../components/Graph";
import Table from "../components/Table";
import { format, parse } from "date-fns";
import Totals from "../components/Totals";

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      updatingData: false,
    };
  }


  handleFileUpload = (ee, isUpdating) => {
    const files = ee.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary',
        raw: true,
      });
      const a = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[a];

      this.handleData(XLSX.utils.sheet_to_json(worksheet), isUpdating);
    };

    reader.readAsBinaryString(file);
  };

  convertDateExcel = (excelTimestamp) => {
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
  };

  checkDuplicate = (data, item) => {
    return data.some((dataItem) => {
      return item.description === dataItem.description &&
        item.subject === dataItem.subject &&
        item.amount === dataItem.amount;
    });
  };

  handleData = (data, isUpdating) => {
    let processedData = [];

    data.map((item) => {
      if (item["Importo"] === undefined || item["Causale"] === undefined) return;
      let date = typeof item["Data valuta"] === "number" ? this.convertDateExcel(item["Data valuta"]) : item["Data valuta"];
      let amount = item["Importo"];

      date = typeof date === "number" ?
        parse(format(date, "dd/MM/yyyy"), "dd/MM/yyyy", new Date()) :
        parse(date, "dd/MM/yyyy", new Date());

      if (typeof amount !== "number") {
        amount = parseFloat(amount.replace("&euro; ", "").replace(".", "").replace(",", ".")).toFixed(2);
      } else {
        amount = parseFloat(item["Importo"]).toFixed(2);
      }

      processedData = [
        ...processedData,
        {
          amount,
          subject: item["Causale"],
          description: item["Descrizione operazione"],
          date
        }
      ];
    });

    processedData = processedData.sort((a, b) => a.date - b.date);

    isUpdating ? this.combineData(processedData) : this.setData(processedData);
  };

  setData(data) {
    localStorage.setItem("data", JSON.stringify(data));

    this.setState({
      data
    });
  }

  combineData(data) {
    if (!this.getLocalStorageData()) return;
    let localStorageData = this.getLocalStorageData();

    let newData = [];

    // remove duplicates
    data.map((item) => {
      if (this.checkDuplicate(localStorageData, item)) return;

      newData = [
        ...newData,
        item
      ];
    });

    newData = [
      ...localStorageData,
      ...newData
    ];

    newData = newData.sort((a, b) => a.date - b.date);

    this.setState({
      data: newData
    }, () => {
      localStorage.setItem("data", JSON.stringify(newData));
    });
  }

  clearData = () => {
    this.setState({
      data: []
    }, () => localStorage.setItem("data", ""));
  };

  downloadData = () => {
    if (!this.getLocalStorageData()) return;

    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(this.getLocalStorageData())));
    a.setAttribute('download', 'savingsAppData');
    a.click();
  };

  uploadSavedData = (e) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);

      this.setState({
        data
      }, () => {
        localStorage.setItem("data", JSON.stringify(data));
      });
    };

    reader.readAsBinaryString(file);
  };

  getLocalStorageData = () => {
    let data = localStorage.getItem("data");
    if (data === undefined || data === "") return null;
    data = JSON.parse(data);
    let category = '';
    data.forEach((item) => {
      category = '';
      switch (item) {
        case (item.description.toLowerCase().indexOf('supermercato') !== -1):
          category = 'food';
          break;
        default:
          category = '';
      }
      console.log(category);
    });
    return data;
  };

  componentDidMount() {
    if (!this.getLocalStorageData()) return;

    this.setState({
      data: this.getLocalStorageData()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello Saving App!</h1>
        <div>
          <label htmlFor="uploadData">Upload data</label>
          <input id="uploadData" type="file" onChange={ (e) => this.handleFileUpload(e, false) } />
          <br/>
          <label htmlFor="updateData">Update data</label>
          <input id="updateData" type="file" onChange={ (e) => this.handleFileUpload(e, true) } />
          <br/>
          <label htmlFor="uploadSavedData">Upload saved data</label>
          <input id="uploadSavedData" type="file" onChange={ this.uploadSavedData } />
          <br/>
          <button onClick={ this.clearData }>Clear Data</button>
          <br/>
          <button onClick={ this.downloadData }>Download Data</button>
          { this.state.data.length > 0 && (
            <>
              <Graph graphData={ this.state.data } />
              <Totals data={ this.state.data } />
              <Table data={ this.state.data } />
            </>
          ) }
        </div>
      </div>
    );
  }
};

