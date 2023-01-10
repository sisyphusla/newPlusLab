import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import StarScore from "./StarScore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RecentClassChild from "./RecentClassChild";
const RecentClass = () => {
  const State = {
    NewCourse: [
      {
        id: 1,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        videLength: 2.5,
        teacher: "王希律",
        tag:"",
      },
      {
        id: 2,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 3,
        ratecount: 41,
        students: 752,
        videLength: 2.5,
        teacher: "黃律",
      },
      {
        id: 3,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
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
        videLength: 2.5,
        teacher: "王希律",
      },
      {
        id: 6,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "新手必學的3件事 - 進場點、停損點、停利點",
        special: 3200,
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
        star: 4,
        ratecount: 41,
        students: 752,
        videLength: 2.5,
        teacher: "王希律",
      },
    ],
    seach: [
      {
        id: 1,
        title: "量價交易精髓：打造股票、期貨完美交易策略",
        time: "2023-01-02 15:15:30",
      },
    ],
  };

  const settings2 = {
    className: "center",
    centerMode: true,
    infinite: true,
    dot: false,
    speed: 500,
    centerPadding: "20px",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1736,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          centerPadding: "90px",
          dots: false,
        },
      },
      {
        breakpoint: 1645,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          centerPadding: "40px",
          dots: false,
        },
      },
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          infinite: true,
          centerPadding: "80px",
          dots: false,
        },
      },
      {
        breakpoint: 1272,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  
  return (
    <div className="divNEW">
      <ul className="ulNewContainer">
        <Slider {...settings2}>
          {State.NewCourse.map((v) => {
            return (
              <RecentClassChild key={v.id} value={v} />
            );
          })}
        </Slider>
      </ul>
    </div>
  );
};

export default RecentClass;


