// src/utils/api.js  (Note: changed from .jsx to .js since it's not a React component)
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/blogs',
  headers: {
    'Content-Type': 'application/json'
  }
});


// Attach JWT token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const register = (data) => axios.post('http://localhost:5000/api/register', data);
export const login = (data) => axios.post('http://localhost:5000/api/login', data);

// Blog CRUD
export const getBlogs = (params) => API.get('/', { params }); // params: { search, category } - public blogs
export const getMyBlogs = () => API.get('/my-blogs'); // user's own blogs
export const getBlog = (id) => API.get(`/${id}`);
export const createBlog = (data) => API.post('/', data);
export const updateBlog = (id, data) => API.put(`/${id}`, data);
export const deleteBlog = (id) => API.delete(`/${id}`);

// Likes
export const likeBlog = (id, data) => API.post(`/${id}/like`, data);
export const unlikeBlog = (id, data) => API.post(`/${id}/unlike`, data);

// Comments
export const addComment = (id, comment) => API.post(`/${id}/comments`, comment);
export const deleteComment = (blogId, commentId) => API.delete(`/${blogId}/comments/${commentId}`);

// Replies
export const postReply = (blogId, commentId, reply) => API.post(`/${blogId}/comments/${commentId}/replies`, reply);

// Profile
export const getProfile = () => axios.get('http://localhost:5000/api/profile');
export const updateProfile = (data) => axios.put('http://localhost:5000/api/profile', data);
export const getStats = () => axios.get('http://localhost:5000/api/stats');

export default API;