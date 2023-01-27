import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { CartState } from "./CartContext";

const Checkout = () => {

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [Total, setTotal] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);


useEffect(() => {
  setSubtotal(
    cart.reduce((acc, curr) => acc + Number(curr.shippingPrice) * 1, 0)
  );
  setTotal(
    cart.reduce((acc, curr) => acc + Number(curr.shippingPrice) * 1, 0)
  );
}, [cart]);

  return (
    <div className="checkoutorder">
      <div className="dOrderTitle">訂單明細</div>
      <div>
        <span className="sSubtotaltitle">小計</span>
        <span className="sSubtotal">NT ${Subtotal}</span>
      </div>
      <div className="sDiscount">
        <input type="checkbox" />
        我要使用折扣碼<span className="sNoSpecial">無法使用</span>
      </div>
      <div className="icodeitems">
        <input className="iDiscountCode" type="text" />
        <input className="iCodeSubmit" type="submit" value="確定" />
      </div>
      <div className="dTotalPrice">NT$ {Total}</div>
      <input className="iorder" type="button" value="結帳" />
    </div>
  );
};

export default Checkout;
