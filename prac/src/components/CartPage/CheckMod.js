import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import CheckDetail from "./CheckDetail";
import { CartState } from "./CartContext";
import CheckOrder from "./CheckOrder";

const CheckMod = () => {
  const {
    state: { order },
  } = CartState();


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
      title: "購買價格",
    },
  ],
};


  return (
    <Fragment>
          <table className="tOrder">
            <thead>
              <tr className="tabletitle">
                {State.titles.map((v) => {
                  return <th key={v.id}>{v.title}</th>;
                })}
              </tr>
              <tr>
                <td colSpan={6}>
                  <hr />
                </td>
              </tr>
            </thead>
            <tbody className="dCheckList">
              {order.map((v)=> <CheckDetail value={v} key={v.id} />)}
            </tbody>
          </table>
      <CheckOrder />
    </Fragment>
  );
};


export default CheckMod;
