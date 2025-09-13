import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:4000/api',

});

//get all categories
export const getCategories = async () => {
    try {
        const response = await API.get(`/furniture-categories`);
        return response.data;
    } catch (err) {
        console.error('Get categories error:', err);
        throw err;
    }
};

//get all items according to category
export const getItemsByCategory = async (categoryName) => {
    try {
        const response = await API.get(`/items/${encodeURIComponent(categoryName)}`);
        return response.data;
    } catch (err) {
        console.error(`Get items by category "${categoryName}" error:`, err);
        throw err;
    }
};

// get all items
export const getItems = async () => {
    try {
        const response = await API.get(`/items`);
        return response.data;
    } catch (err) {
        console.error('Get items error:', err);
        throw err;
    }
};

//get items according to id
export const getItemsByID = async (itemID) => {
    try {
        const response = await API.get(`/items/details/${itemID}`);
        return response.data.data;
    } catch (err) {
        console.error(`Get item by ID "${itemID}" error:`, err);
        throw err;
    }
};

//user registration
export const registerUser = async (data) => {
    try {
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || "customer",
        };
        const response = await API.post(`/auths/register`, payload, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;

    } catch (err) {
        console.error('Register error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
        });
        throw err;
    }
};


//user login
export const loginUser = async (data) => {
    try {
        const payload = {
            email: data.email,
            password: data.password,
        };
        const response = await API.post(`/auths/login`, payload, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        return response.data;
    } catch (err) {
        console.error('login error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
        });
        throw err;
    }
};

// logout
export const logoutUser = async () => {
    try {
        const response = await API.post(`/auths/logout`,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.error('Logout error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
        });
        throw err;
    }
};
