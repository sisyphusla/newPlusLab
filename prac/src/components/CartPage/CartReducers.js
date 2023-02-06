import instance from "../../api/axiosInstance";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_COURSE":
      return { ...state, Courselist: action.payload };
    case "REFRESH_CART":
      return { ...state, cart: action.payload };
    case "REFRESH_COLLECTIONS":
      return { ...state, collection: action.payload };
    case "REFRESH_DISCOUNT":
      return { ...state, discount: action.payload };
    case "REFRESH_MYCOURSE":
      return { ...state, mycourse: action.payload };
    case "REFRESH_HISTORY":
      return { ...state, history: action.payload };
    case "REFRESH_ORDER":
      return { ...state, order: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "ADD_TO_ORDER":
      return {
        ...state,
        order: [...state.order, { ...action.payload }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "REMOVE_FROM_ORDER":
      return {
        ...state,
        order: state.order.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.value.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case "ADD_TO_COllECTTAG":
      return {
        ...state,
        collection: [...state.collection, { ...action.payload }],
      };
    case "REMOVE_FROM_COllECTTAG":
      return {
        ...state,
        collection: state.collection.filter((c) => c.id !== action.payload.id),
      };

    case "UPDATE_TO_ORDER":
      return {
        ...state,
        order: [...action.payload],
      };

    default:
      return state;
  }
};
