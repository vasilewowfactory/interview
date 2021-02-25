/* eslint-disable */
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/todo/';

class ToDoService {

    getToDoList(params: any) {
        return axios.get(BASE_URL, {params});
    }

    addItem(formData: any) {
        return axios.post(BASE_URL, formData);
    }

    updateItem(id: string | number, field: boolean) {
        return axios.put(BASE_URL + id, {done: field});
    }

    deleteItem(id: string | number){
        return axios.delete(BASE_URL + id);
    }
}

export default new ToDoService();
