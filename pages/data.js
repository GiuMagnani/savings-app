import React from "react";
import LayoutWrapper from "../Layout";
import data from "../data.json";
import { withRouter } from "next/router";

const Data = ({ router }) => {
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

export default withRouter(Data);
