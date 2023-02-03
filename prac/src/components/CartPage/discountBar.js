import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { CartState } from "./CartContext";
import { getError } from "./utils";
import user from "../../utils/memoryUtils";

const DiscountBar = ({ placeholder, data, disabled }) => {
  const {
    state: { cart, order, discount },
    dispatch,
  } = CartState();
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newDisCount = data.filter((v) => {
      return v.discountCode.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newDisCount);
    }
  };

  const handlediscount = (e) => {
    setWordEntered(e.target.innerText);
    setFilteredData([]);
  };

  const handleToAdd = (e) => {
    const discount = async () => {
      try {
        const result = await instance.post("/orderCourse/updatediscount", {
          user: user.user._id,
          discount: wordEntered,
        });
        if (result.data !== "") {
          dispatch({ type: "UPDATE_TO_ORDER", payload: result.data });
        }
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    discount();
  };

  return (
    <div className="icodeitems">
      <input
        className="iDiscountCode"
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={wordEntered}
        onChange={handleFilter}
      />
      <button className="iCodeSubmit" onClick={handleToAdd}>
        確認
      </button>
      {filteredData.length != 0 && (
        <div className="discountGroup">
          {filteredData.map((v, i) => (
            <div
              className="searchDiscount"
              onClick={handlediscount}
              key={i}
              value={v}
            >
              {v.discountCode}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountBar;
