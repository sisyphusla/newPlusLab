import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const PopCourse = () => {
  const State = {
    popCourse: [
      {
        key: 1,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "SAM老師的全方位股票分析法",
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      },
      {
        key: 2,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "SAM老師的全方位股票分析法",
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      },
      {
        key: 3,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "SAM老師的全方位股票分析法",
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      },
      {
        key: 4,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "SAM老師的全方位股票分析法",
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      },
      {
        key: 5,
        img: "https://picsum.photos/500/300",
        url: "https://picsum.photos/500/300",
        title: "SAM老師的全方位股票分析法",
        text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      },
    ],
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    dots: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };

  return (
    <div className="dHotCarousel">
      <Slider {...settings}>
        {State.popCourse.map((v) => {
          return (
            <div key={v.key} className="slider">
              <div className="card">
                <div className="cardImg">
                  <img src={v.img} alt="" />
                </div>
                <ul>
                  <li>
                    <Link to="/">
                      <svg
                        width="50"
                        height="50"
                        viewBox="3 3 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5964 8.69663L5.23279 12.3885C4.6925 12.7019 4 12.3228 4 11.6922L4 4.30846C4 3.67783 4.6925 3.29871 5.23279 3.61216L11.5964 7.30403C12.1345 7.6162 12.1345 8.38445 11.5964 8.69663Z"
                          fill="#e23965"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
                <div className="titletxt">{v.title}</div>
                <div className="text">{v.text}</div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PopCourse;
