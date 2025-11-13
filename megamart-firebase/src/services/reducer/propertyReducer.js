const initalState = {
    products: [],
    product: null,
    isError: false,
    isCreated: false,
    isUpdated: false
}

export const productReducer = (state = initalState, action) => {
    switch (action.type) {

        case "ADD_PRODUCT_SUC":
            return {
                ...state,
                // products: [...state.products, action.payload],
                isCreated: true,
                isError: ""
            }

        case "ADD_PRODUCT_REJ":
            return {
                ...state,
                isError: action.message
            }

        case "GET_ALL_PRODUCT_SUC":
            return {
                ...state,

                products: action.payload,
                isCreated: false,
                isError: "",
                isUpdated: false
            }

        case "GET_ALL_PRODUCT_REJ":
            return {
                ...state,
                isCreated: false,
                isError: action.message
            }

        case "DELETE_PRODUCT_REJ":
            return {
                ...state,
                isError: action.message
            }
        case "GET_PRODUCT_REJ":
            return {
                ...state,
                isError: action.message
            }
        case "GET_PRODUCT_SUC":
            return {
                ...state,
                product: action.payload
            }

        case "UPDATE_PRODUCT_REJ":
            return {
                ...state,
                product: null,
                isUpdated: true
            }

        case "UPDATE_PRODUCT_SUC":
            return {
                ...state,
                product: null,
                isUpdated: true
            };

        default:
            return state;
    }
}


 