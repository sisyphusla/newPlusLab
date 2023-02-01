import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import StarScore from "./StarScore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import instance from "../../api/axiosInstance";
import { CartState } from "../CartPage/CartContext";
import { getError } from "../CartPage/utils";
import user from "../../utils/memoryUtils";

const ForYouCourse = (props) => {
  

   
const [ForYouData, setForYouData] = useState([]);
 

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    dots: true,
  
  };
  const {
    state: { cart, collection },
    dispatch,
  } = CartState();

  useEffect(() => {
    let ForYouCoursreData = async () => {
      try {
        await instance
          .get("/course/forYouCourse")
          .then((res) => setForYouData(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    ForYouCoursreData();
  }, []);
 const handleAddToCart = (e) => {
  
   const FetchData = async () => {
     try {
       const result = await instance.post("/cart/cart", {
         user: user.user._id,
         id: props.value.id,
         Course: props.value._id,
         img: props.value.img,
         url: props.value.url,
         title: props.value.title,
         price: props.value.price,
         shoppingPrice: props.value.special,
         teacher: props.value.teacher,
         isChecked: false,
       });
       // .get("/cart/cart");

       dispatch({ type: "ADD_TO_CART", payload: result.data });
     } catch (err) {
       dispatch({ type: "FETCH_FAIL", payload: getError(err) });
     }
   };
   FetchData();
   e.preventDefault();
 };


  return (
    <div className="divToYou">
      {/* <div className="dBecause">因為你曾經瀏覽了「{State.seach[0].title}」</div> */}
      <Slider {...settings}>
        {ForYouData.map((t) => {
          return (
            <Link to={`/video/${t.title}`} key={t.id}>
              <div className="divItems">
                <div className="imgClass">
                  <img src={t.img} />
                </div>
                <div className="dClasstext">
                  <div className="score">
                    <span className="sStar">{t.star}</span>
                    <StarScore star={t.star} />
                    <span>({t.ratecount})</span>
                    <span className="sPersonCount">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 -2 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                          fill="#9d9faa"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                          fill="#9d9faa"
                        />
                      </svg>
                      {t.students} 人
                    </span>
                    <span className="sClock">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 -2 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z"
                          fill="#9d9faa"
                        />
                        <path
                          d="M8.53334 4.2666H7.46667V8.46332L11.2 10.6666L11.7333 9.80627L8.53334 7.93873V4.2666Z"
                          fill="#9d9faa"
                        />
                      </svg>
                      {t.videLength} 小時
                    </span>
                  </div>
                  <div>
                    <h5>{t.title}</h5>
                  </div>
                  <div>
                    <p>{t.text}</p>
                  </div>
                  <div className="dClassPrice">
                    <span>
                      限時專屬價 NT${" "}
                      {Number(
                        parseFloat(t.special).toFixed(3)
                      ).toLocaleString()}{" "}
                    </span>

                    <button
                      className="dClassPriceBtn"
                      onClick={handleAddToCart}
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default ForYouCourse;
