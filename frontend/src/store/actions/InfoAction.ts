import { GET_ERRORS, GET_SUCCESS, CLEAR_INFO, LOGOUT_SUCCESS } from '../types';
// RETURN ERRORS
export const returnErrors = (message: any, status: any, id: any = null, message2: any = '') => (dispatch: any) => {
  let msg = {
    message: '',
    status: status
  }
  if (message) {
    if (message.email) {
      msg.message = message.email[0]
    } else if (message.nama) {
      msg.message = message.nama[0]
    } else if (message.nohp) {
      msg.message = message.nohp[0]
    } else if (message.password) {
      msg.message = message.password[0]
    } else {
      msg = message
    }
  } else {
    msg.message = message2
  }

  if (message && (message.status === 401 && message.statusText === "Unauthorized")) {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  }

  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// RETURN ERRORS
export const returnSuccess = (message: any, status: any, id: any = null) => {
  return {
    type: GET_SUCCESS,
    payload: { message, status, id }
  };
};

// CLEAR SUCCESS
export const clearInfo = () => {
  return {
    type: CLEAR_INFO
  };
};