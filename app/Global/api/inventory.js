"use client"
// api.js
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://c.mmsdev.site/api/v1/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the token from the cookie
const getToken = () => {
  return Cookies.get('token');
};

// Interceptor to set the Authorization header with the token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = (url) => {
  return axiosInstance.get(url);
};

export const getVoucherData = (url) => {
  return axiosInstance.get(url);
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

export const put = (url, data = {}) => {
  return axiosInstance.put(url, data);
};


export const del = (url) => {
  return axiosInstance.delete(url);
};

// Function to upload a photo
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("photos[]", file);
  return axiosInstance.post("photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Function to get photo data
export const getPhotoData = () => {
  const endpoint = "photo";
  return axiosInstance.get(endpoint);
};






