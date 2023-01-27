import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import StarScore from "../CoursePage/StarScore";
import { CartState } from "./CartContext";
import Mark from "./Mark";

const MarkMod = () => {
  const {
    state: { collection },
  } = CartState();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (collection.length !== 0) {
    return (
      <ul
        className="dCollectlist"
        style={{ display: collection.length > 3 ? "" : "flex" }}
      >
        {collection.length > 3 ? (
          <Slider {...settings}>
            {collection.map((r) => {
              return <Mark value={r} key={r.id} />;
            })}
          </Slider>
        ) : (
          collection.map((v) => {
            return <Mark value={v} key={v.id} />;
          })
        )}
      </ul>
    );
  } else {
    return (
      <ul className="dCollectlist">
        <div className="btnCartNone">
          <Link to="/Coursepage">
            <button>立即探索課程</button>
          </Link>
        </div>
      </ul>
    );
  }
};
export default MarkMod;
