import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FilterBox from "./FilterBox";
import LoadigBox from "./LoadingBox";
import MessegeBox from "./MessageBox";
import SelectCourseChild from "./SelectCourseChild";
import { getError } from "./utils";
import { CartState } from "../CartPage/CartContext";
import SelectCoursemod from "./SelectCoursemod";
// import data from "./data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUENT":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, SelectCourse: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SelectCourse = (props) => {
  const {
    state: { Courselist },
  } = CartState();

 
  let [list, setList ] = useState([]);    // 全部数据
  let [page, setPage ] = useState(1);  //  第一次展示 第一页的数据
  let getData = Courselist;
console.log(Courselist);
console.log(list);
  useEffect(() => {
    //  第一次挂载的时候，请求数据
    setList(getData);
  }, []);
  const getNextPage = ()=>{
     setPage((preState)=>preState+1)
  }
  // const [SelectCourse, setSelectCourse] = useState([]);


  return (
    <Fragment>
      <div className="divAllCourse">
        {/* <FilterBox /> */}
        <ul className="ulAllCourseContainer">
          {/* {
           loading ? (
             <LoadigBox />
           ) : error ? (
             <MessegeBox />
           ) : (
            )
           } */}
          {list.length !== 0 ? (
            <SelectCoursemod
              data={list.slice(0, page * 12)}
              handleNextPage={getNextPage}
              curPage={page}
            />
          ) : null}
        </ul>
      </div>

      {list.slice(0, page * 12).length !== Courselist.length ? (
        <div className="dCardMore">
          <button onClick={getNextPage}>
            查看下一頁精彩課程
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
      ) : (
        <div className="dCardLast">
          <button>
            課程已達最後分頁
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default SelectCourse;
