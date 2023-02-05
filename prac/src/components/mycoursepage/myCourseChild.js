import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "../CartPage/CartContext";
import user from "../../utils/memoryUtils";
import { getError } from "../CartPage/utils";

import StarScore from "./StarScore";
// import data from "./data";

const MyCourseChild = (props) => {
  const {
    state: { cart, collection },
    dispatch,
  } = CartState();

  // const [SelectCourse, setSelectCourse] = useState([]);
  const [Saturate, setSaturate] = useState(false);
  const handleMouseOver = () => {
    // document.getElementById(index).style.filter = "saturate(2)";
    setSaturate(true);
  };
  const handleMouseOut = () => {
    // document.getElementById(index).style.filter = "";
    setSaturate(false);
  };

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
  const handleDelCart = (e) => {
    const DelData = async () => {
      try {
        const result = await instance.post("/cart/delCart", {
          user: user.user._id,
          id: props.value.id,
          Course: props.value._id,
          img: props.value.img,
          url: props.value.url,
          title: props.value.title,
          price: props.value.price,
          teacher: props.value.teacher,
          shoppingPrice: props.value.special,
        });
        dispatch({ type: "REMOVE_FROM_CART", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    DelData();
    e.preventDefault();
  };
  const handleAddToCollections = (e) => {
    const FetchData = async () => {
      try {
        const result = await instance.post("/collection/updateCollections", {
          user: user.user._id,
          id: props.value.id,
          Course: props.value._id,
          img: props.value.img,
          url: props.value.url,
          title: props.value.title,
          text: props.value.text,
          star: props.value.star,
          ratecount: props.value.ratecount,
          price: props.value.price,
          special: props.value.special,
          students: props.value.students,
          videLength: props.value.videLength,
          teacher: props.value.teacher,
        });
        // .get("/cart/cart");
        console.log(result.data);
        dispatch({ type: "ADD_TO_COllECTTAG", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    FetchData();
    e.preventDefault();
  };
  const handleDelCollections = (e) => {
    const DelData = async () => {
      try {
        const result = await instance.post("/collection/delcollection", {
          user: user.user._id,
          id: props.value.id,
          Course: props.value._id,
          img: props.value.img,
          url: props.value.url,
          title: props.value.title,
          text: props.value.text,
          star: props.value.star,
          ratecount: props.value.ratecount,
          price: props.value.price,
          special: props.value.special,
          students: props.value.students,
          videLength: props.value.videLength,
          teacher: props.value.teacher,
        });
        dispatch({ type: "REMOVE_FROM_COllECTTAG", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    DelData();
    e.preventDefault();
  };

  return (
    <Link to={`/video/${props.value.title}`}>
      <li
        className="dCard"
        id={props.value.id}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{ filter: `${Saturate ? "saturate(2)" : ""}` }}
      >
        <img className="imgCard" src={props.value.img} />

        <div className="dCardMark">
          {collection.some((p) => p.id === props.value.id) ? (
            <svg
              width="20"
              height="30"
              viewBox="0 2 20 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleDelCollections}
            >
              <path
                d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                fill="#E23965"
              />
              <path
                d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                fill="#E23965"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="30"
              viewBox="0 2 20 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleAddToCollections}
            >
              <path
                d="M2.85714 0H17.1429C18.7143 0 20 1.3 20 2.88889V26L10 21.6667L0 26L0.014286 2.88889C0.014286 1.3 1.28571 0 2.85714 0Z"
                fill=""
              />
              <path
                d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z"
                fill="#E23965"
              />
            </svg>
          )}
        </div>
        <div className="dCardtext">
          <div className="dCardScore">
            <span className="dCardStar">{props.value.star}</span>
            <span>
              <StarScore star={props.value.star} />
            </span>
            <span>({props.value.ratecount})</span>
          </div>
          <div className="dCardTitle">{props.value.title}</div>
          <div className="dCardTeacher">{props.value.teacher}</div>
          <div className="dCardPersonCount">
            <svg
              width="18"
              height="18"
              viewBox="0 -3 18 18"
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
            {props.value.students} 人
          </div>
          <div className="dCardClock">
            <svg
              width="20"
              height="20"
              viewBox="0 -4 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.992 0C3.576 0 0 4.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z"
                fill="#9d9faa"
              />
              <path
                d="M8.53334 4.2666H7.46667V8.46332L11.2 10.6666L11.7333 9.80627L8.53334 7.93873V4.2666Z"
                fill="#9d9faa"
              />
            </svg>
            {props.value.videLength} 小時
          </div>
          
        </div>
      </li>
    </Link>
  );
};

export default MyCourseChild;
