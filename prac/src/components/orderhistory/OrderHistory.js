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
    ":00";



    
  return (
    <Fragment>
      <tr>
        <td>
          <img src={props.value.img} alt="" />
        </td>
        <td className="dCartitem">
          <Link to={`/video/${props.value.title}`}>
            <div className="dCartTiltle">{props.value.title}</div>
          </Link>
          <div className="dCartTeacher">{props.value.teacher}</div>
        </td>

        <td className="dSpecailPrice">
          NT${" "}
          {Number(
            parseFloat(props.value.shoppingPrice).toFixed(3)
          ).toLocaleString()}
        </td>
        <td className="dHisTime">{DateFormatStr}</td>
      </tr>
      <tr>
        <td colSpan={6}>
          <hr />
        </td>
      </tr>
    </Fragment>
  );
};

export default OrderHsitory;
