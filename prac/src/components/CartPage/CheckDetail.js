import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useReducer,
} from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "./CartContext";
import Checkout from "./Checkout";
import user from "../../utils/memoryUtils";
import { getError } from "./utils";

const CheckDetail = (props) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <Fragment>
      <tr>
        <td>
          <img src={props.value.img} alt="" />
        </td>
        <td className="dCartitem">
          <Link to={`/video/${props.value.title}`}>
            <div className="dCheckTiltle">{props.value.title}</div>
          </Link>
          <div className="dCartTeacher">{props.value.teacher}</div>
        </td>
        <td className="dCheckPrice">
          NT${" "}
          {Number(
            props.value.shoppingPrice
          ).toLocaleString()}
        </td>
      </tr>
      <tr>
        <td colSpan={6}>
          <hr />
        </td>
      </tr>
    </Fragment>
  );
};

export default CheckDetail;
