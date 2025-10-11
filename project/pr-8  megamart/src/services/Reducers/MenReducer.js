const initialstate = {
  products: JSON.parse(localStorage.getItem("men")) || [],
  isLoading: false,
  product: null,
};

const Menreducer = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      let data = JSON.parse(localStorage.getItem("men")) || [];
      data = [...data, action.payload];
      localStorage.setItem("men", JSON.stringify(data));
      return {
        ...state,
        products: data,
      };
    case "GET_ALL_PRODUCT":
      let allproduct = JSON.parse(localStorage.getItem("men")) || [];
      return {
        ...state,
        products: allproduct,
        isLoading: false,
      };
    case "DELETE_PRODUCT":
      let Data = JSON.parse(localStorage.getItem("men")) || [];
      let updateData = Data.filter((v) => v.id != action.payload);
      localStorage.setItem("men", JSON.stringify(updateData));
      return {
        ...state,
        products: updateData,
      };

    case "GET_PRODUCT":
      let getData = JSON.parse(localStorage.getItem("men")) || [];
      let singleRec = getData.find((v) => v.id == action.payload);
      return {
        ...state,
        product: singleRec,
      };

    case "UPDATE_PRODUCT":
      let GetData = JSON.parse(localStorage.getItem("men")) || [];
      let updatedData = GetData.map((v) => {
        if (v.id == action.payload.id) {
          return action.payload;
        } else {
          return v;
        }
      });
      localStorage.setItem("men", JSON.stringify(updatedData));
      return {
        ...state,
        product: null,
        products: updatedData,
      };

    default:
      return state;
  }
};

export default Menreducer;
