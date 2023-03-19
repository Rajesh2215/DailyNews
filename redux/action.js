export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const CDATA = 'CDATA'
export const loginSuccess = ({user,data}) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
  data:data
});

export const logout = () => ({
  type: LOGOUT,
});

export const CData = (cdata) => ({
  type: CDATA,
  payload:{cdata}
});