// reducers.js

import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, LOGOUT } from './action';
const initialState = {
    isAuthenticated: false,
    user: null,
  };
const myReducer =(state = initialState, action: { type: any; payload: { user: any; }; }) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };

const rootReducer = combineReducers({
  myReducer,
});

export default rootReducer;
