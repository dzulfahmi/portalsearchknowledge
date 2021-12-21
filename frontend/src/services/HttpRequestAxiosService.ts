import Axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  CancelTokenStatic,
} from 'axios';
import {Observable} from 'rxjs';

export class HttpRequestAxiosService {
  cancelToken: CancelTokenStatic = Axios.CancelToken;

  constructor(public axios: AxiosInstance) {}

  public post<T = any>(
    url: string = '',
    data?: any,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable(
      (observer: {
        error: (arg0: any) => void;
        next: (arg0: any) => void;
        complete: () => void;
      }) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;
        (this.axios.post(url, data, config) as AxiosPromise)
          .catch(error => {
            observer.error(error);
            throw error;
          })
          .then(response => {
            observer.next(response && response.data);
            observer.complete();
          });

        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      },
    );
  }

  public put<T = any>(
    url: string = '',
    data?: any,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable(
      (observer: {
        error: (arg0: any) => void;
        next: (arg0: any) => void;
        complete: () => void;
      }) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;

        (this.axios.put(url, data, config) as AxiosPromise)
          .catch(error => {
            observer.error(error);
            throw error;
          })
          .then(response => {
            observer.next(response && response.data);
            observer.complete();
          });

        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      },
    );
  }

  public get<T = any>(
    url: string = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable(
      (observer: {
        error: (arg0: any) => void;
        next: (arg0: any) => void;
        complete: () => void;
      }) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;

        (this.axios.get(url, config) as AxiosPromise)
          .catch(error => {
            observer.error(error);
            throw error;
          })
          .then(response => {
            observer.next(response && response.data);
            observer.complete();
          });

        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      },
    );
  }

  public delete<T = any>(
    url: string = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable(
      (observer: {
        error: (arg0: any) => void;
        next: (arg0: any) => void;
        complete: () => void;
      }) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;

        (this.axios.delete(url, config) as AxiosPromise)
          .catch(error => {
            observer.error(error);
            throw error;
          })
          .then(response => {
            observer.next(response && response.data);
            observer.complete();
          });

        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      },
    );
  }

  public patch<T = any>(
    url: string = '',
    data?: any,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return new Observable(
      (observer: {
        error: (arg0: any) => void;
        next: (arg0: any) => void;
        complete: () => void;
      }) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;

        (this.axios.patch(url, data, config) as AxiosPromise)
          .catch(error => {
            observer.error(error);
            throw error;
          })
          .then(response => {
            observer.next(response && response.data);
            observer.complete();
          });

        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      },
    );
  }
}
