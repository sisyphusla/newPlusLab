import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import instance from "../../api/axiosInstance";
const PopCourse = () => {

const [PopCourse, setPopCourse] = useState([]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

useEffect(() => {
  let FetchData = async () => {
    try {
      await instance
        .get("/popCourses")
        .then((res) => setPopCourse(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  FetchData();
}, []);





  return (
    <div className="dHotCarousel">
      <Slider {...settings}>
        {PopCourse.map((v) => {
          return (
            <div key={v.id} className="slider">
              <div className="card" >
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
