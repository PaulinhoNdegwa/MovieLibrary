import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const baseUrl = 'https://movies-v2.api-fetch.website/';

const getToken = async () => {
  return AsyncStorage.getItem('userToken');
};

class Api {
  methods = ['get', 'post', 'put', 'delete'];
  constructor() {
    this.axios = token =>
      axios.create({
        baseURL: baseUrl,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
      });

    this.methods.forEach(method => {
      Api.prototype[method] = async (url, data = {}) => {
        const token = await getToken();
        return this.axios(token)[method](url, data);
      };
    });
  }
}
export const axiosWithToken = new Api();
