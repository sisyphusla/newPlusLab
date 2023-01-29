import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../CartPage/CartContext";
import noneBox from "./img/Box.png";
import OrderHsitory from "./OrderHistory";

const OrderHistoryMod = () => {
  const {
    state: { cart },
  } = CartState();

  const State = {
    titles: [
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
        title: "購買價格",
      },

      {
        id: 5,
        title: "購買時間",
      }
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
              {cart.map((v) => (
                <OrderHsitory value={v} key={v.id} />
              ))}
            </tbody>
          </table>
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
    </Fragment>
  );
};

export default OrderHistoryMod;
