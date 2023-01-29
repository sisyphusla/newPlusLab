import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "./CartContext";
import { getError } from "./utils";
import user from "../../utils/memoryUtils";
import DiscountBar from "./discountBar";
import Checkpage from "../../pages/checkpage/checkpage";

const CheckOrder = () => {
  const {
    state: { cart, order, discount },
    dispatch,
  } = CartState();

  const [Total, setTotal] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setSubtotal(
      order.reduce((acc, curr) => acc + Number(curr.shoppingPrice) * 1, 0)
    );
    setTotal(
      order.reduce((acc, curr) => {
        console.log();
        return acc + Number(curr.shoppingPrice) * 1 * curr.discount;
      }, 0)
    );
  }, [order]);

  return (
    <div className="checkoutorder">
      <div className="dOrderTitle">訂單確認</div>
      <div>
        <span className="sSubtotaltitle">小計</span>
        <span className="sSubtotal">NT ${Subtotal}</span>
      </div>
      <div className="sDiscount">
        <span> 折扣碼</span>
        <div className="icodeitems">
          <input
            className="icheckDiscountCode"
            type="text"
            disabled={true}
            value={order[0].discountCode}
          />
        </div>
        <div className="dCheckTotalPrice">NT$ {Total}</div>
        <Link to="/">
          <button className="iCheckorder">確認結帳</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckOrder;
