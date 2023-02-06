import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MyCourseChild from "./myCourseChild";
import { CartState } from "../CartPage/CartContext";

// import data from "./data";

const MyCoursemod = (props) => {
  let { data, handleNextPage, curPage } = props;

  const {
    state: { mycourse },
    dispatch,
  } = CartState();



  return (
    <Fragment>
      {mycourse.map((v) => {
        return <MyCourseChild key={v.id} value={v} />;
      })}
    </Fragment>
  );
};
export default MyCoursemod;
