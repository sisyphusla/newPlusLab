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


let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let mseconds= now.getMilliseconds();
if (parseInt(month, 10) < 10) {
  month = "0" + parseInt(month, 10);
}
if (parseInt(day, 10) < 10) {
  day = "0" + parseInt(day, 10);
}
if (parseInt(hours, 10) < 10) {
  hours = "0" + parseInt(hours, 10);
}
if (parseInt(minutes, 10) < 10) {
  minutes = "0" + parseInt(minutes, 10);
}
if (parseInt(seconds, 10) < 10) {
  seconds = "0" + parseInt(seconds, 10);
}
if (parseInt(mseconds, 10) < 10) {
  mseconds = "00" + parseInt(mseconds, 10);
}else if(parseInt(mseconds, 10) < 100) {
  mseconds = "0" + parseInt(mseconds, 10);
}
let yyyymmddHHMMSS = year + month + day + hours + minutes + seconds + mseconds;


let orderlist=[];


orderlist=order.map((v)=>
  {return {
    id: v.Course,
    name: v.title,
    quantity: 1,
    price: v.shoppingPrice * v.discount,
    imageUrl: v.img,
    originalPrice: v.shoppingPrice,
  };}
)






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

const handlePayOrder = ()=>{
    const payToLinepay= async()=>{
     try {
      const result = await instance.post("/order/topay", {
        amount: Total,
        currency: "TWD",
        packages: [
          {
            id: yyyymmddHHMMSS,
            amount: Total,
            products: orderlist,
          },
        ],
      });

     } catch (error) {
      
     }
}}

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
       
          <button className="iCheckorder" onClick={handlePayOrder}>確認結帳</button>
        
      </div>
    </div>
  );
};

export default CheckOrder;
