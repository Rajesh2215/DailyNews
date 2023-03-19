// reducers.js

import { combineReducers } from 'redux';
import { CDATA, LOGIN_SUCCESS, LOGOUT } from './action';
const initialState = {
    isAuthenticated: false,
    user: null,
    data:null
  };
const myReducer =(state = initialState, action: { type: any; payload: { user: any; data:any }; }) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          data:action.payload.data
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          // data:null
        };

      case CDATA:
        return{
          ...state,
          cdata:action.payload.data
        }
      default:
        return state;
    }
  };

const rootReducer = combineReducers({
  myReducer,
});

export default rootReducer;
