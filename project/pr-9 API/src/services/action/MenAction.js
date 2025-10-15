import axios from "axios";

export const loading = () => ({ type: "LOADING" });
export const getAllproduct = (data) => ({ type: "GET_ALL_PRODUCT_SUC", payload: data });
export const getAllproductRej = (msg) => ({ type: "GET_ALL_PRODUCT_REJ", payload: msg });
export const addnewProductSuc = (data) => ({ type: "ADD_PRODUCT_SUC", payload: data });
export const addnewProductRej = (msg) => ({ type: "ADD_PRODUCT_REJ", payload: msg });
export const getproduct = (data) => ({ type: "GET_PRODUCT_SUC", payload: data });
export const getproductRej = (msg) => ({ type: "GET_PRODUCT_REJ", payload: msg });
export const updateproduct = (data) => ({ type: "UPDATE_PRODUCT_SUC", payload: data });
export const updateproductRej = (msg) => ({ type: "UPDATE_PRODUCT_REJ", payload: msg });
export const deleteProductRej = (msg) => ({ type: "DELETE_PRODUCT_REJ", payload: msg });

// Get all products
export const getAllproductAsync = () => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get("http://localhost:3000/menproducts")
      .then((res) => dispatch(getAllproduct(res.data)))
      .catch((err) => dispatch(getAllproductRej(err.message)));
  };
};

// Add new product
export const addnewProductAsync = (data) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .post("http://localhost:3000/menproducts", data)
      .then(() => {
        dispatch(addnewProductSuc(data));
        dispatch(getAllproductAsync());
      })
      .catch((err) => dispatch(addnewProductRej(err.message)));
  };
};

// Get single product
export const getproductAsync = (id) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get(`http://localhost:3000/menproducts/${id}`)
      .then((res) => dispatch(getproduct(res.data)))
      .catch((err) => dispatch(getproductRej(err.message)));
  };
};

// Update product
export const updateproductAsync = (data) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .put(`http://localhost:3000/menproducts/${data.id}`, data)
      .then(() => {
        dispatch(updateproduct(data));
        dispatch(getAllproductAsync()); // refresh
      })
      .catch((err) => dispatch(updateproductRej(err.message)));
  };
};

// Delete product
export const DeleteproductAsync = (id) => {
  return (dispatch) => {
    dispatch(loading());
    axios
      .delete(`http://localhost:3000/menproducts/${id}`)
      .then(() => dispatch(getAllproductAsync()))
      .catch((err) => dispatch(deleteProductRej(err.message)));
  };
};
