import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

/*Common function to handle GET/POST request*/
function sendAPIRequest<T>(
  url: string,
  method: 'GET' | 'POST',
  headers: Record<string, string>,
  data: any = null
): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  return apiClient(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((error) => {
      return Promise.reject(error);
    });
}

const ApiServices = {

  /*GET request*/
  getData<T>(url: string): Promise<T> {
    return sendAPIRequest<T>(
      url,
      'GET',
      {
        'Content-Type': 'application/json',
      }
    );
  },

  /*POST request*/
  postData<T>(url: string, data:any): Promise<T> {
    return sendAPIRequest<T>(
        url,
        'POST',
        {
            'Content-Type': 'application/json',
        },
        data,
    );
  }
};

export default ApiServices;
