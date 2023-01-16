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
  console.log(handleNextPage);
    useEffect(() => {
      document
        .querySelector(".divAllCourse")
        .addEventListener("scroll", debounce(fn, 300));

      return () =>
        document.querySelector(".divAllCourse").removeEventListener("scroll", debounce(fn, 300));
    }, [data]);

    function debounce(fn, wait) {
      //  防抖 。 非立即执行版本
      let timer;
      return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.call(context, ...args), wait);
      };
    }

    function fn() {
     
      const currentScrollTop =
        document.querySelector(".divAllCourse").scrollTop; //  滚动元素上面超出的距离
      const maxScrollTop =
        document.querySelector(".divAllCourse").scrollHeight -
        document.querySelector(".divAllCourse").offsetHeight;
      //  滚动页面长度 - 此容器高度 =  滚动元素上面超出的距离 + 底部未出现的高度
      if (maxScrollTop - currentScrollTop < 12) {
        handleNextPage(); //  请求下一页
      }
    }
  // const [SelectCourse, setSelectCourse] = useState([]);
  return (
    <Fragment>
      {data.map((v) => {
        return <SelectCourseChild key={v.id} value={v} />;
      })}
    </Fragment>
  );
};

export default SelectCoursemod;
