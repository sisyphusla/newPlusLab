import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "./CartContext";
import { getError } from "./utils";
import user from "../../utils/memoryUtils";
import DiscountBar from "./discountBar";
import Checkpage from "../../pages/checkpage/checkpage";

const Checkout = () => {

  const {
    state: { cart, order, discount},
    dispatch,
  } = CartState();

  const [Total, setTotal] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);


useEffect(() => {
  setSubtotal(order.reduce((acc, curr) => acc + Number(curr.shoppingPrice) * 1 , 0));
  setTotal(order.reduce(
      (acc, curr) =>acc + Number(curr.shoppingPrice) * 1 * curr.discount,0));
}, [order]);

  return (
    <div className="checkoutorder">
      <div className="dOrderTitle">訂單明細</div>
      <div>
        <span className="sSubtotaltitle">小計</span>
        <span className="sSubtotal">NT ${Subtotal}</span>
      </div>
      <div className="sDiscount">
        <span> 我要使用折扣碼</span>
        <DiscountBar
          placeholder={
            discount.length !== 0 ? "請輸入折扣碼" : "無法使用折扣碼"
          }
          data={discount}
          disabled={discount.length === 0 ? true : false}
        />
      </div>
      <div className="dTotalPrice">NT$ {Total}</div>
      <Link to="/checkpage" className="aCheckorder">
        <button className="iorder">結帳</button>
      </Link>
    </div>
  );
};

export default Checkout;
