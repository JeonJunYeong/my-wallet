import axios, { AxiosPromise } from 'axios';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HTTPHeaders = any;

export type HTTPParams = unknown;

class API {
  readonly method: HTTPMethod;
  readonly url: string;
  baseURL?: string;
  headers?: HTTPHeaders;
  params?: HTTPParams;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  constructor(method: HTTPMethod, url: string) {
    this.method = method;
    this.url = `${url}`;
  }
  call<T>(): AxiosPromise<T> {
    const http = axios.create();

    if (this.withCredentials) {
      http.interceptors.response.use(
        response => response,
        error => {
          if (error.response && error.response.status === 401) {
          }

          return Promise.reject(error);
        }
      );
    }
    return http.request({ ...this });
  }
}

export default API;
