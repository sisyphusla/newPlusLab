import React, { useState, useEffect, Fragment, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import logger from "use-reducer-logger";

import SelectCourseChild from "./SelectCourseChild";
// import data from "./data";
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUENT":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, SelectCourse: action.payload, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

const SelectCourse = () => {
  const State = {
    SelectCourse: [
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
        tag: "",
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
  // const [{ loading, error, SelectCourse }, dispatch] = useReducer(
  //   logger(reducer),
  //   {
  //     SelectCourse: [],
  //     loading: true,
  //     error: "",
  //   }
  // );

  // const [SelectCourse, setSelectCourse] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_REQUENT" });
  //     try {
  //       const result = await axios.get("/api/allCourse");
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: "FETCH_FAIL", payload: err.message });
  //     }
  //     // setSelectCourse(result.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <Fragment>
      <div className="divAllCourse">
        <ul className="ulAllCourseContainer">
          {
          // loading ? (
          //   <div>loading...</div>
          // ) : error ? (
          //   <div>{error}</div>
          // ) : (
            State.SelectCourse.map((v, i) => {
              return <SelectCourseChild key={i} value={v} />;
            })
          }
        </ul>
      </div>
      <div className="dCardMore">
        <button>
          查看所有精彩課程
          <svg
            width="24"
            height="26"
            viewBox="3 3 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5964 8.69663L5.23279 12.3885C4.6925 12.7019 4 12.3228 4 11.6922L4 4.30846C4 3.67783 4.6925 3.29871 5.23279 3.61216L11.5964 7.30403C12.1345 7.6162 12.1345 8.38445 11.5964 8.69663Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </Fragment>
  );
};

export default SelectCourse;
