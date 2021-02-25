/* eslint-disable */
import axios from 'axios';

import { MetaParams } from '@/interfaces';

const BASE_URL = 'http://localhost:3000/api/v1/todo/';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class ToDoService {
  getToDoList(params?: MetaParams) {
    return axios.get(BASE_URL, { params, headers });
  }

  addItem(description: string) {
    return axios.post(BASE_URL, { description }, { headers });
  }

  updateItem(id: string | number, field: boolean) {
    return axios.put(BASE_URL + id, { done: field }, { headers });
  }

  deleteItem(id: string | number) {
    return axios.delete(BASE_URL + id, { headers });
  }
}

export default new ToDoService();
