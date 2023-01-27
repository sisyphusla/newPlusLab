import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import OrderDetail from "../CartPage/OrderDetail";
import { CartState } from "./CartContext";
import Checkout from "./Checkout";
import noneBox from "./img/Box.png";

const OrderMod = () => {
  const {
    state: { cart },
  } = CartState();
const State = {
  titles: [
    {
      id: 1,
      title: <input type="checkbox" name="allOrder" id="20" />,
    },
    {
      id: 2,
      title: "縮圖",
    },
    {
      id: 3,
      title: "標題/作者",
    },

    {
      id: 4,
      title: "原價",
    },

    {
      id: 5,
      title: "特價",
    },
    {
      id: 6,
      title: "刪除",
    },
  ],
};


  return (
    <Fragment>
      {cart.length > 0 ? (
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
            <tbody className="dCartList">
              {cart.map((v)=> <OrderDetail value={v} key={v.id} />)}
            </tbody>
          </table>
          <Checkout />
        </Fragment>
      ) : (
        <Fragment>
          <div className="dCartNone">
            <img src={noneBox} alt="noneBox" />
          </div>
          <div className="btnCartNone">
            <Link to="/Coursepage">
              <button>立即探索課程</button>
            </Link>
          </div>
        </Fragment>
      )}
      <Checkout />
    </Fragment>
  );
};

export default OrderMod;
