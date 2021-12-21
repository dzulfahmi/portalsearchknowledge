import {httpRequestAxiosService} from '../../services';
import {returnErrors, returnSuccess} from './InfoAction';
import { CRAWLER_GET_COUNT_FAIL, CRAWLER_GET_COUNT_SUCCESS, CRAWLER_GET_FAIL, CRAWLER_GET_SUCCESS, CRAWLER_LOADING } from '../types';
import { tokenConfig } from './AuthAction';

// Get Crawler Result
export const getCrawlerResult = (qparam: any) => (dispatch: any, getState: any) => {
  dispatch({type: CRAWLER_LOADING});

  let param = {
    page: qparam && qparam.page ? qparam.page : 1,
    limit: qparam && qparam.limit ? qparam.limit : 10,
  };

  httpRequestAxiosService.get(process.env.REACT_APP_MAIN_API + 'contents?limit=' + param.limit + '&page=' + param.page, tokenConfig(getState))
    .subscribe((resp: any) => {
      dispatch({
        type: CRAWLER_GET_SUCCESS,
        resp: resp,
      });
      dispatch(returnSuccess('Content berhasil diperoleh.', 200, 'CRAWLER_GET_SUCCESS'));
    },
    (err: any) => {
      dispatch(
        returnErrors(
          (err && err.response && err.response) || 'Content belum berhasil diperoleh',
          (err && err.response && err.response.status) || 401,
          'CRAWLER_GET_FAIL',
        ),
      );
      dispatch({
        type: CRAWLER_GET_FAIL,
      });
  })
};

// Get Crawler Count
export const getCrawlerCount = () => (dispatch: any, getState: any) => {
  dispatch({type: CRAWLER_LOADING});

  httpRequestAxiosService.get(process.env.REACT_APP_MAIN_API + 'contents/count', tokenConfig(getState))
    .subscribe((resp: any) => {
      dispatch({
        type: CRAWLER_GET_COUNT_SUCCESS,
        resp: resp,
      });
      dispatch(returnSuccess('Content berhasil diperoleh.', 200, 'CRAWLER_GET_COUNT_SUCCESS'));
    },
    (err: any) => {
      dispatch(
        returnErrors(
          (err && err.response && err.response) || 'Content belum berhasil diperoleh',
          (err && err.response && err.response.status) || 401,
          'CRAWLER_GET_COUNT_FAIL',
        ),
      );
      dispatch({
        type: CRAWLER_GET_COUNT_FAIL,
      });
  })
};