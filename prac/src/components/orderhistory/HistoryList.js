import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

const HistoryList = () => {
  const State = {
    cart: [
      {
        id: 1,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title:
          "新手必學的3件事 - 進場點、停損點、停利點新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        orignprice: 4000,
        ratecount: 41,
        students: 752,
        videLength: 2.5,
        teacher: "王希律",
      },
      {
        id: 2,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title:
          "新手必學的3件事 - 進場點、停損點、停利損點、停利點新手必學的3件事 點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 3,
        ratecount: 41,
        orignprice: 4000,
        students: 752,
        videLength: 2.5,
        teacher: "黃律",
      },
      {
        id: 3,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title:
          "新手必學的3件事 - 進場點、停損點、停利點損點、停利點新手必學的3件事 ",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        orignprice: 4000,
        videLength: 2.5,
        teacher: "王希律",
      },
      {
        id: 4,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        orignprice: 4000,
        videLength: 2.5,
        teacher: "王希律",
      },
      {
        id: 5,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        orignprice: 4000,
        videLength: 2.5,
        teacher: "王希律",
      },
      {
        id: 6,
        img: "https://picsum.photos/500/800",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        orignprice: 4000,
        videLength: 2.5,
        teacher: "王希律",
      },
    ],
  };
  return (
    <Fragment>
        {State.cart.map((v) => {
          return (
            <Fragment key={v.id}>
              <li>
                <img src="https://picsum.photos/250/150" alt="" />
                <div className="dOrderHistoryListItem">
                  <Link to="/">
                    <div className="dOrderHistoryTiltle">{v.title}</div>
                  </Link>
                  <div className="dOrderHistoryTeacher">{v.teacher}</div>
                </div>

                <div className="dHistoryOldPrice">NT$ {v.orignprice}</div>
                <div className="dHistorySpecailPrice">NT$ {v.special}</div>
              </li>
              <div className="dHr">
                <hr />
              </div>
            </Fragment>
          );
        })}
    
    </Fragment>
  );
};

export default HistoryList;
