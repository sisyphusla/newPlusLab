export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.value.id !== action.payload.value.id),
      };
    case "REMOVE_CART":
      const valueid = () => {
         for (let j = 0; j < state.cart.length; j++) {
           for (let i = 0; i < action.payload.length; i++) {
             if (state.cart[j].value.id === action.payload[i].value.id) {
               return state.cart.filter(
                 (c) => c.value.id !== action.payload[i].value.id
               );
             }
           }
         }
       };
   
     
      return {
        ...state,
        cart: valueid(),
      };
     
     
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.value.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};
