import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import config from 'config';
import routes from "config/routes";
import {getToken, removeToken} from "utils/token";

export interface IHttp {
  get<T>(args: any): Promise<T>;
  post<T>(args: any): Promise<T>;
  put<T>(args: any): Promise<T>;
  delete<T>(args: any): Promise<T>;
}

export interface IError {
  status: number;
  data: any;
  headers: any;
}

export interface IHttpParam {
  endpoint: string;
  payload?: any;
  config?: any;
}

export interface IToken {
  token: string;
}

export default class Http implements IHttp {
  private instance;
  private headers;

  constructor(baseUrl: string = config.apiUrl as string) {
    this.headers = this.getHeaders();

    this.instance = axios.create({
      baseURL: baseUrl,
    });

    this.initialInterceptors();
  }

  private initialInterceptors = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);

    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    config = {
      ...config,
      headers: {
        ...config.headers,
        ...this.getHeaders(),
        ...this.headers,
      },
    };

    return config;
  };

  private handleResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private handleError = (err: any): Promise<IError> => {
    if (err.response) {
      const { status, data, headers } = err.response;
      if (status === 401) {
        removeToken({ name: config.tokenName });
        window.location.href = routes.login.path;
      }

      return Promise.reject({
        status,
        data,
        headers,
      });
    } else {
      return Promise.reject({
        status: 500,
        headers: null,
        data: err.message,
      });
    }
  };

  getHeaders = () => {
    const token = this.token();

    const headers: any = {
      'content-type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return headers;
  };

  token = (): string | null => {
    return getToken({ name: config.tokenName});
  };

  changeHeaders = (headerConfig: any) => {
    this.headers = {
      ...this.headers,
      ...headerConfig,
    };
  };

  get<T>(args: IHttpParam): Promise<T> {
    return this.instance.get(args.endpoint).then((response: any) => {
      return response as T;
    });
  }

  post<T>(args: IHttpParam): Promise<T> {
    return this.instance.post(args.endpoint, args.payload, args.config).then((response: any) => {
      return response as T;
    });
  }

  patch<T>(args: IHttpParam): Promise<T> {
    return this.instance.patch(args.endpoint, args.payload).then((response: any) => {
      return response as T;
    });
  }

  put<T>(parameters: IHttpParam): Promise<T> {
    return this.instance
      .put(parameters.endpoint, parameters.payload, parameters.config)
      .then((response: any) => {
        return response as T;
      });
  }

  delete<T>(parameters: any): Promise<T> {
    return Promise.resolve({} as T);
  }
}