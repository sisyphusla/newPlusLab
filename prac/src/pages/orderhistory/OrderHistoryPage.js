import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Top from "../../components/top/Top";
import OrderGoup from "../../components/orderhistory/OrderHistoryMod";
import Mark from "../../components/CartPage/Mark";
import cart from "../../components/CartPage/img/cart.svg";
import history from "../../components/orderhistory/img/history.svg";
import collectCourse from "../../components/CartPage/img/collectCourse.svg";
import memoryUtils from "../../utils/memoryUtils";
import Nav from "../../components/nav/Nav";
import NavLogOut from "../../components/nav/NavLogOut";
import Footer from "../../components/footer/Footer";

const OrderHistoryPage = () => {
  let title = [
    {
      key: 1,
      title: "訂單紀錄",
      iconPath: history,
      compos: OrderGoup,
    },
  ];
const username =
  memoryUtils.user.username || memoryUtils.user.displayName || "";
  return (
    <Fragment>
      {username ? <Nav /> : <NavLogOut />}
      <div className="headerss"></div>
      {title.map((t) => {
        return (
          <div className="dOrderHistoryContainer" key={t.key}>
            <div className="dOrderHistoryTitle">
              <span className="dOrderHistoryTitle">
                {t.title}
                <img src={t.iconPath} />
              </span>
            </div>
            <div className="OrderHistorycompos">
              <t.compos />
            </div>
          </div>
        );
      })}
      <Top />
      <Footer />
    </Fragment>
  );
};
export default OrderHistoryPage;
