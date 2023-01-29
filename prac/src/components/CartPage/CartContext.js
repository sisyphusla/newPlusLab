import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import instance from "../../api/axiosInstance";
import { cartReducer } from "./CartReducers";
import { getError } from "./utils";
import user from "../../utils/memoryUtils";

const Cart = createContext();

const Context = ({ children }) => {
  

 
useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await instance.get(`/course/allCourses`);
        dispatch({ type: "REFRESH_COURSE", payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
},[])

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await instance.get(`/cart`);
      dispatch({ type: "REFRESH_CART", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await instance.get(`/collection`);
      dispatch({ type: "REFRESH_COLLECTIONS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };
  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await instance.post(`/orderCourse/get`, {
        user: user.user._id,
      });
      dispatch({ type: "REFRESH_ORDER", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };
  fetchData();
}, []);

useEffect(() => {
   const discount = async () => {
     try {
       const result = await instance.post("/cart/getdicount", {
         user: user.user._id,
         today: new Date(),
       });
       dispatch({ type: "REFRESH_DISCOUNT", payload: result.data });
     } catch (err) {
       dispatch({ type: "FETCH_FAIL", payload: getError(err) });
     }
   };
  discount();
}, []);

  const [state, dispatch] = useReducer(cartReducer, {
    Courselist:[],
    cart: [],
    order:[],
    collection:[],
    discount:[],
    loading: true,
    error: '',
  });

  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  );
};
export default Context;


export const CartState =()=>{
  return useContext(Cart);
}