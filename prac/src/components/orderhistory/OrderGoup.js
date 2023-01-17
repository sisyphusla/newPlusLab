import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import HistoryList from "../orderhistory/HistoryList";
const OrderMod = () => {
  const State = {
    titles: [
    
      {
        id: 1,
        title: "縮圖",
      },
      {
        id: 2,
        title: "標題/作者",
      },

      {
        id: 3,
        title: "原價",
      },

      {
        id: 4,
        title: "購買價格",
      }
    ],
  };

  return (
    <Fragment>
      <div className="dHr">
        <div className="tabletitle">
          {State.titles.map((v) => {
            return <div key={v.id}>{v.title}</div>;
          })}
        </div>
        <hr />
      </div>
      <ul className="dOrderHistoryList">
        <HistoryList />
      </ul>
    </Fragment>
  );
};

export default OrderMod;
