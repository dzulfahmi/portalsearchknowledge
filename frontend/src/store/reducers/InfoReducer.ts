/* eslint-disable import/no-anonymous-default-export */
import { GET_ERRORS, GET_SUCCESS, CLEAR_INFO } from '../types';

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case GET_SUCCESS:
      return {
        msg: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_INFO:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}