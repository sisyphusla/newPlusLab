import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import StarScore from "./StarScore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RecentClassChild from "./RecentClassChild";
import axios from "axios";
import instance from "../../api/axiosInstance";
const RecentClass = () => {
 
  const [recentClass, setrecentClass] = useState([]); // 全部數據

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

useEffect(() => {
  let recentCoursreData = async () => {
    try {
      await instance
        .get("/course/recentClass")
        .then((res) => setrecentClass(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  recentCoursreData();
}, []);


  return (
    <div className="divNEW">
      <ul className="ulNewContainer">
        <Slider {...settings2}>
          {recentClass.map((v) => {
            return <RecentClassChild key={v.id} value={v} />;
          })}
        </Slider>
      </ul>
    </div>
  );
};

export default RecentClass;


