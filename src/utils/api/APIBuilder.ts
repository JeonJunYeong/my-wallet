import API, { HTTPHeaders, HTTPMethod, HTTPParams } from './API';

// const apiHost = 'https://erphelp.douzone.com/ai/api';
const apiHost = 'http://172.30.1.27:5001';
// const apiHost = 'https://m365.douzone.com';
// const apiHost = 'https://dev2.comet.duzon.net';

class APIBuilder {
  private _instance: API;

  constructor(method: HTTPMethod, url: string, data?: unknown) {
    this._instance = new API(method, url);
    this._instance.baseURL = apiHost;
    this._instance.data = data;
    this._instance.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    this._instance.timeout = 50000;
    this._instance.withCredentials = false;
  }

  static get = (url: string) => new APIBuilder('GET', url);

  static put = (url: string, data: unknown) => new APIBuilder('PUT', url, data);

  static post = (url: string, data: unknown) => new APIBuilder('POST', url, data);

  static delete = (url: string) => new APIBuilder('DELETE', url);

  baseURL(value: string): APIBuilder {
    this._instance.baseURL = value;
    return this;
  }

  headers(value: HTTPHeaders): APIBuilder {
    this._instance.headers = value;
    return this;
  }

  timeout(value: number): APIBuilder {
    this._instance.timeout = value;
    return this;
  }

  params(value: HTTPParams): APIBuilder {
    this._instance.params = value;
    return this;
  }

  data(value: unknown): APIBuilder {
    this._instance.data = value;
    return this;
  }

  withCredentials(value: boolean): APIBuilder {
    this._instance.withCredentials = value;
    return this;
  }

  build(): API {
    return this._instance;
  }
}

export default APIBuilder;
