import {
  AUTH_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../types';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  accessToken: '',
  user: null,
  meData: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.resp,
        accessToken: action.resp.token,
      };
    case REGISTER_SUCCESS:
      // localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isLoading: false,
      };
    case AUTH_ERROR:
      return {};
    case LOGIN_FAIL:
      return {
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        accessToken: null,
        meData: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case REGISTER_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
