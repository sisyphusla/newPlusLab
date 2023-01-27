import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SelectCourseChild from "./SelectCourseChild";

// import data from "./data";

const SelectCoursemod = (props) => {

    let { data, handleNextPage, curPage } = props;
 
    // useEffect(() => {
    //   document
    //     .querySelector(".divAllCourse")
    //     .addEventListener("scroll", debounce(fn, 300));

    //   return () =>
    //     document.querySelector(".divAllCourse").removeEventListener("scroll", debounce(fn, 300));
    // }, [data]);

    // function debounce(fn, wait) {
    //   //  防跳動
    //   let timer;
    //   return function (...args) {
    //     let context = this;
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => fn.call(context, ...args), wait);
    //   };
    // }

    // function fn() {
     
    //   const currentScrollTop =
    //     document.querySelector(".divAllCourse").scrollTop; //  滾動元素上面的距離
    //   const maxScrollTop =
    //     document.querySelector(".divAllCourse").scrollHeight -
    //     document.querySelector(".divAllCourse").offsetHeight;
    //   //  滾動頁面長度-此容器高度=滾動元素上面超出的距離+底部未出現的高度
    //   if (maxScrollTop - currentScrollTop < 12) {
    //     handleNextPage(); //  請求下一頁
    //   }
    // }
  // const [SelectCourse, setSelectCourse] = useState([]);


  return (
    <Fragment>
      {data.map((v) => {
        return <SelectCourseChild key={v.id} value={v}  />;
      })}
    </Fragment>
  );
};

export default SelectCoursemod;
