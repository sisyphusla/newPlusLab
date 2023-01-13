import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./CartReducers";

const Cart = createContext();

const Context = ({ children }) => {
  const Courselist = [
    {
      id: 1,
      img: "https://picsum.photos/500/300",
      url: "https://picsum.photos/500/300",
      title: "新手必學的3件事 - 進場點、停損點、停利點",
      special: 3200,
      text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      star: 4,
      orignprice: 4000,
      ratecount: 41,
      students: 752,
      videLength: 2.5,
      teacher: "王希律",
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
      orignprice: 4000,
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
      orignprice: 4000,
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
      orignprice: 4000,
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
      orignprice: 4000,
      videLength: 2.5,
      teacher: "王希律",
    },
    {
      id: 6,
      img: "https://picsum.photos/500/500",
      url: "https://picsum.photos/500/500",
      title: "新手必學的3件事 - 進場點、停損點、停利點",
      special: 3200,
      text: " 一堂能讓各種交易風格都能更強大的衝刺課程！夠短，夠直接，能兼容在不同投資思維之中，能兼容在不同投資思維之中",
      star: 4,
      ratecount: 41,
      students: 752,
      orignprice: 4000,
      videLength: 2.5,
      teacher: "王希律",
    },
  ];

  const [state, dispatch] = useReducer(cartReducer, {
    Courselist: Courselist,
    cart: [],
  });

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};
export default Context;


export const CartState =()=>{
  return useContext(Cart);
}