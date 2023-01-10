import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Top from "../../components/top/Top";
import OrderMod from "../../components/CartPage/OrderMod";
import Mark from "../../components/CartPage/Mark";
import cart from "../../components/CartPage/img/cart.svg";
import collectCourse from "../../components/CartPage/img/collectCourse.svg";


const Cartpage = (props) => {
  let title = [
    {
      key: 1,
      title: "購物車",
      iconPath: cart,
      compos: OrderMod,
    },
    {
      key: 2,
      title: "我收藏的課程",
      iconPath: collectCourse,
      compos: Mark,
    },
  ];

  return (
    <Fragment>
      <div className="headerss"></div>
      {title.map((t) => {
        return (
          <div className="dCartContainer" key={t.key}>
            <div className="dcartPageTitle">
              <span className="dCartTitle">
                {t.title}
                <img src={t.iconPath} />
              </span>
            </div>
            <div className="cartcompos">
              <t.compos />
            </div>
          </div>
        );
      })}
      <Top />
    </Fragment>
  );
};
export default Cartpage;
