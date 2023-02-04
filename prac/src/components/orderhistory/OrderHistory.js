import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useReducer,
} from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "../CartPage/CartContext";
import user from "../../utils/memoryUtils";
import { getError } from "../CartPage/utils";
import OrderHsitoryList from "./OrderHistoryList";

const OrderHsitory = (props) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  let date = new Date(props.value.updatedAt);
  let DateFormatStr =
    date.getFullYear().toString() +
    "-" +
    ((date.getMonth() + 1).toString().length == 2
      ? (date.getMonth() + 1).toString()
      : "0" + (date.getMonth() + 1).toString()) +
    "-" +
    (date.getDate().toString().length == 2
      ? date.getDate().toString()
      : "0" + date.getDate().toString()) +
    " " +
    (date.getHours().toString().length == 2
      ? date.getHours().toString()
      : "0" + date.getHours().toString()) +
    ":" +
    ((parseInt(date.getMinutes() / 5) * 5).toString().length == 2
      ? (parseInt(date.getMinutes() / 5) * 5).toString()
      : "0" + (parseInt(date.getMinutes() / 5) * 5).toString()) +
    ":" +
    ((parseInt(date.getSeconds() / 5) * 5).toString().length == 2
      ? (parseInt(date.getSeconds() / 5) * 5).toString()
      : "0" + (parseInt(date.getSeconds() / 5) * 5).toString());



  return (
    <Fragment>
      {props.value.packages.map((v) => {
     
          return (
            <Fragment key={v._id}>
              <tr>
                <td colSpan={4} className="historyId">
                  訂單編號:{v.id}
                </td>
              </tr>
              <OrderHsitoryList val={v.products} />

              <tr className="totallistdata">
                <td colSpan={2}>訂單時間:{DateFormatStr}</td>
                <td colSpan={2} className="totalprice">
                  總價格:NT$ {Math.round(v.amount).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="nodata"></td>
              </tr>
            </Fragment>
          );
        })
      }
    </Fragment>
  );
};

export default OrderHsitory;
