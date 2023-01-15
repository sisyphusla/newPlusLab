export const loadReducer = (state, action) => {
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
