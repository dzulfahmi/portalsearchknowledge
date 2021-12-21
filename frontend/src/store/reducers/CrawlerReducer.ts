import { CRAWLER_GET_COUNT_FAIL, CRAWLER_GET_COUNT_SUCCESS, CRAWLER_GET_FAIL, CRAWLER_GET_SUCCESS, CRAWLER_LOADING } from '../types';

const initialState = {
  data: [],
  total: 0,
  isLoading: false,
  contents: undefined,
  tContent: undefined,
  tElastic: undefined,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case CRAWLER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CRAWLER_GET_SUCCESS:
      return {
        ...state,
        data: action.resp.contents,
        total: action.resp.total,
        isLoading: false,
      };
    case CRAWLER_GET_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case CRAWLER_GET_COUNT_SUCCESS:
      return {
        ...state,
        contents: action.resp.contents,
        tContent: action.resp.totalContent,
        tElastic: action.resp.totalElastic,
        isLoading: false,
      };
    case CRAWLER_GET_COUNT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
