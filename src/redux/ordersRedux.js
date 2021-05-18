import Axios from 'axios';
import { API_URL } from '../config';


/* selectors */
export const getAllOrders = ({orders}) => orders.data;
export const getLoadingOrders = ({orders}) => orders.loading;

/* action name creator */
const reducerName = 'orders';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_ORDERS_START = createActionName('FETCH_ORDERS_START');
const FETCH_ORDERS_SUCCESS = createActionName('FETCH_ORDERS_SUCCESS');
const FETCH_ORDERS_ERROR = createActionName('FETCH_ORDERS_ERROR');
const FETCH_ORDERS_TO_CART = createActionName('FETCH_ORDERS_TO_CART');
const FETCH_ORDERS_EDIT = createActionName('FETCH_ORDERS_EDIT');
const FETCH_ORDERS_SAVE = createActionName('FETCH_ORDERS_SAVE');
const FETCH_ORDERS_DELETE_ONE = createActionName('FETCH_ORDERS_DELETE_ONE');
const FETCH_ORDERS_CLEAN = createActionName('FETCH_ORDERS_CLEAN');
// const FETCH_ORDERS_DELETE_ALL_FROM_CART = createActionName('FETCH_ORDERS_DELETE_ALL_FROM_CART');


/* action creators */
export const fetchOrdersStarted = payload => ({ payload, type: FETCH_ORDERS_START });
export const fetchOrdersSuccess = payload => ({ payload, type: FETCH_ORDERS_SUCCESS });
export const fetchOrdersError = payload => ({ payload, type: FETCH_ORDERS_ERROR });
export const fetchOrdersToCart = payload => ({ payload, type: FETCH_ORDERS_TO_CART });
export const fetchOrdersEdit = payload => ({ payload, type: FETCH_ORDERS_EDIT });
export const fetchSaveOrder = payload => ({ payload, type: FETCH_ORDERS_SAVE });
export const fetchOrdersDeleteOne = payload => ({ payload, type: FETCH_ORDERS_DELETE_ONE });
export const fetchOrdersClean = payload => ({ payload, type: FETCH_ORDERS_CLEAN });
// export const fetchOrdersDeleteAll = payload => ({ payload, type: FETCH_ORDERS_DELETE_ALL_FROM_CART });

/* thunk creators */
export const fetchSaveNewOrder = (order) => {
  return(dispatch, getState) => {
    console.log('order', order);
    dispatch(fetchOrdersStarted());

    Axios
      .post(`${API_URL}/cart`, order)
      .then(res => {
        dispatch(fetchSaveOrder(order));
      })
      .then(res => {
        dispatch(fetchOrdersClean());
      })
      .catch(err => {
        dispatch(fetchOrdersError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_ORDERS_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
          added: false,
          done: false,
        },
      };
    }
    case FETCH_ORDERS_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          done: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ORDERS_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
          added: false,
          done: false,
        },
      };
    }
    case FETCH_ORDERS_TO_CART: {
      // console.log('action.payload w fetch orders to cart:', action.payload);
      // console.log('statePart w fetch orders to cart:', statePart);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: true,
          done: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    case FETCH_ORDERS_EDIT: {
      // console.log('action.payload w fetch orders edit:', action.payload);
      // console.log('statePart w fetch orders edit:', statePart);
      const statePartIndex = statePart.data.findIndex(booking => booking.apartments._id === action.payload.apartments._id);
      statePart.data.splice(statePartIndex, 1, action.payload);

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          done: false,
        },
        data: [...statePart.data],
      };
    }
    case FETCH_ORDERS_SAVE: {
      // console.log('action.payload w fetch orders save:', action.payload);
      // console.log('statePart w fetch orders tsave:', statePart);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          done: true,
        },
        data: action.payload,
      };
    }
    case FETCH_ORDERS_DELETE_ONE: {
      // console.log('action.payload w fetch orders delete:', action.payload);
      // console.log('statePart w fetch orders delete:', statePart);
      const statePartIndex = statePart.data.findIndex(booking => booking.apartments._id === action.payload._id);
      statePart.data.splice(statePartIndex, 1);

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          done: false,
        },
        data: [...statePart.data],
      };
    }
    case FETCH_ORDERS_CLEAN: {
      // console.log('action.payload w fetch orders delete:', action.payload);
      // console.log('statePart w fetch orders delete:', statePart);

      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          added: false,
          done: true,
        },
        data: [],
      };
    }
    default:
      return statePart;
  }
};
