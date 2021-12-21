
import {returnErrors, returnSuccess} from './InfoAction';
import {httpRequestAxiosService} from '../../services';

import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // ACCOUNT_RESET,
} from '../types';
import axios from 'axios';

// Login User
export const login = (payload: any) => (dispatch: any) => {
  dispatch({type: AUTH_LOADING});

  httpRequestAxiosService.post(process.env.REACT_APP_MAIN_API + 'users/login', payload).subscribe(
    (response: any) => {
      dispatch({
        type: LOGIN_SUCCESS,
        resp: response,
      });
      dispatch(returnSuccess('Login berhasil.', 200, 'LOGIN_SUCCESS'));
    },
    (err: any) => {
      dispatch(
        returnErrors(
          (err && err.response && err.response) || 'Login belum berhasil',
          (err && err.response && err.response.status) || 401,
          'LOGIN_FAIL',
        ),
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    },
  );
};

// Setup config/headers and token
export const tokenConfig = (getState: any) => {
  // Get token from localstorage
  const token = getState().auth.accessToken;
  // Headers
  const config: any = {
    headers: {
      'Content-Type': 'application/json',

    },
    timeout: 120000
  };

  // If token, add to headers
  if (token) {
    // config.headers['x-auth-token'] = token;
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
};

// Logout
export const logout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  // dispatch({
  //   type: ACCOUNT_RESET,
  // });
};