import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import CheckDetail from "./CheckDetail";
import { CartState } from "./CartContext";
import CheckOrder from "./CheckOrder";
import noneBox from "./img/Box.png";

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
      {order.length > 0 ? (
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
            {order.map((v) => (
              <CheckDetail value={v} key={v.id} />
            ))}
          </tbody>
        </table>
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
      <CheckOrder />
    </Fragment>
  );
};

export default CheckMod;
