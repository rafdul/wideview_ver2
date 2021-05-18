import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllApartments = ({apartments}) => apartments.data;
export const getOne = ({apartments}) => apartments.oneApartment;
export const getLoading = ({apartments}) => apartments.loading;


/* action name creator */
const reducerName = 'apartments';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE = createActionName('FETCH_ONE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOne = payload => ({ payload, type: FETCH_ONE });

/* thunk creators */
export const fetchAllPublished = () => {
  return async (dispatch, getState) => {
    const { apartments } = getState();
    // console.log('apartments w redux', apartments);

    // console.log('apartments.data.length w redux', apartments.data.length);
    if(apartments.data.length === 0 && apartments.loading.active === false) {
      dispatch(fetchStarted());

      await Axios
        .get(`${API_URL}/apartments`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
          // console.log('res.data w redux', res.data);
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOnePublished = (id) => {
  return(dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/apartments/${id}`)
      .then(res => {
        dispatch(fetchOne(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
          loaded: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          loaded: true,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
          loaded: false,
        },
      };
    }
    case FETCH_ONE: {
      // console.log('...statePart:', ...statePart);
      // console.log('action.payload:', action.payload);
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          loaded: true,
        },
        oneApartment: action.payload,
      };
    }
    default:
      return statePart;
  }
};
