import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:4000/api',
});

//get all categories
export const getCategories = () => API.get(`/furniture-categories`)

//get all items according to category
export const getItemsByCategory = (categoryName) => API.get(`/items/${categoryName}`);
