import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import instance from "../../api/axiosInstance";
import { cartReducer } from "./CartReducers";
import { getError } from "./utils";

const Cart = createContext();

const Context = ({ children }) => {
  

  // const Courselist = [
  //   {
  //     id: 1,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     orignprice: 4000,
  //     ratecount: 41,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 2,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 3,
  //     ratecount: 41,
  //     orignprice: 4000,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "黃律",
  //   },
  //   {
  //     id: 3,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 4,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 5,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 6,
  //     img: "https://picsum.photos/500/500",
  //     url: "https://picsum.photos/500/500",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 7,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     orignprice: 4000,
  //     ratecount: 41,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 8,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 3,
  //     ratecount: 41,
  //     orignprice: 4000,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "黃律",
  //   },
  //   {
  //     id: 9,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 10,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 11,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 12,
  //     img: "https://picsum.photos/500/500",
  //     url: "https://picsum.photos/500/500",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },{   
  //     id: 13,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     orignprice: 4000,
  //     ratecount: 41,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 14,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 3,
  //     ratecount: 41,
  //     orignprice: 4000,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "黃律",
  //   },
  //   {
  //     id: 15,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 16,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 17,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 18,
  //     img: "https://picsum.photos/500/500",
  //     url: "https://picsum.photos/500/500",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 19,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     orignprice: 4000,
  //     ratecount: 41,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 20,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 3,
  //     ratecount: 41,
  //     orignprice: 4000,
  //     students: 752,
  //     videLength: 2.5,
  //     teacher: "黃律",
  //   },
  //   {
  //     id: 21,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 22,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 23,
  //     img: "https://picsum.photos/500/300",
  //     url: "https://picsum.photos/500/300",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  //   {
  //     id: 24,
  //     img: "https://picsum.photos/500/500",
  //     url: "https://picsum.photos/500/500",
  //     title: "新手必學的3件事 - 進場點、停損點、停利點",
  //     special: 3200,
  //     text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
  //     star: 4,
  //     ratecount: 41,
  //     students: 752,
  //     orignprice: 4000,
  //     videLength: 2.5,
  //     teacher: "王希律",
  //   },
  // ];


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


  const [state, dispatch] = useReducer(cartReducer, {
    Courselist:[],
    cart: [],
    order:[],
    collection:[],
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