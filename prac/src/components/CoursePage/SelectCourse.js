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

const SelectCourse = () => {
  const {
    state: { Courselist },
  } = CartState();

  const [{ loading, error, SelectCourse }, dispatch2] = useReducer(reducer, {
    Courselist: [],
    loading: true,
    error: "",
  });


  // const [SelectCourse, setSelectCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch2({ type: "FETCH_REQUENT" });
      try {
        const result = await axios.get("/api/allCourse");
        dispatch2({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch2({ type: "FETCH_FAIL", payload: getError(err) });
      }
      // setSelectCourse(result.data);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="divAllCourse">
        {/* <FilterBox /> */}
        <ul className="ulAllCourseContainer">
          {loading ? (
            <LoadigBox />
          ) : error ? (
            <MessegeBox />
          ) : (
            Courselist.map((v, i) => {
              return <SelectCourseChild key={i} value={v} />;
            })
          )}
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
