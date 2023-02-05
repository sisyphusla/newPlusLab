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

const OrderHsitoryList = (props) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <Fragment>
      {props.val.map((item) => {
        return (
          <Fragment key={item.id.id}>
            <tr className="historylist">
              <td>
                <img src={item.imageUrl} alt="" />
              </td>
              <td className="dCartitem">
                <Link to={`/video/${item.id.id}`}>
                  <div className="dCartTiltle">{item.name}</div>
                </Link>
                <div className="dCartTeacher">{item.id.teacher}</div>
              </td>
              <td className="dHistoryOldPrice">
                NT$ {Math.round(item.originalPrice).toLocaleString()}
              </td>
              <td className="dHistorySpecailPrice">
                NT$ {Math.round(item.price).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <hr />
              </td>
            </tr>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default OrderHsitoryList;
