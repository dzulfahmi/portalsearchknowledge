import Axios from 'axios';
import {HttpRequestAxiosService} from './HttpRequestAxiosService';

export const httpRequestAxiosService = new HttpRequestAxiosService(Axios.create());