const initialState = {
  products: [],
  isLoading: false,
  product: null,
  isError: "",
  isCreated: false,
  isUpdated: false,
};

const MenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };

    case "ADD_PRODUCT_SUC":
      return { ...state, isCreated: true, isLoading: false };

    case "ADD_PRODUCT_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "GET_ALL_PRODUCT_SUC":
      return { ...state, products: action.payload, isLoading: false, isError: "" };

    case "GET_ALL_PRODUCT_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "DELETE_PRODUCT_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "GET_PRODUCT_SUC":
      return { ...state, product: action.payload, isLoading: false };

    case "GET_PRODUCT_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    case "UPDATE_PRODUCT_SUC":
      return { ...state, product: null, isUpdated: true, isLoading: false };

    case "UPDATE_PRODUCT_REJ":
      return { ...state, isError: action.payload, isLoading: false };

    default:
      return state;
  }
};

export default MenReducer;
