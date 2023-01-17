export const cartReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_COURSE":
      return { ...state, Courselist: action.payload };
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
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.value.id !== action.payload.value.id),
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.value.id !== action.payload.id),
      };
    
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.value.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case "ADD_TO_CollectTAG":
      return {
        ...state,
        collection: [...state.collection, { ...action.payload }],
      };
    case "REMOVE_FROM_CollectTAG":
      return {
        ...state,
        collection: state.collection.filter(
          (c) => c.value.id !== action.payload.value.id
        ),
      };
    case "REMOVE_CollectTAG":
      const markid = () => {
        if (state.collection.length >= 0 && action.payload.length >= 0) {
          for (let j = 0; j < state.collection.length; j++) {
            for (let i = 0; i < action.payload.length; i++) {
              if (state.collection[j].value.id !== action.payload[i].value.id) {
                return state.collection.filter(
                  (c) => c.value.id !== action.payload[i].value.id
                );
              }
            }
          }
        }
      };
      return {
        ...state,
        ollection: markid(),
      };

    default:
      return state;
  }
};
