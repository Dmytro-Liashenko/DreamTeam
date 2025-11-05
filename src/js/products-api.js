import axios from 'axios';

const API_BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
const API_ENDPOINTS = {
  FURNITURES_LIST: '/furnitures',
  FURNITURE_ITEM: '/furnitures/',
  CATEGORIES_LIST: '/categories',
  USERS_ORDER: '/orders',
};

axios.defaults.baseURL = API_BASE_URL;

export async function getFurnituresList() {
  try {
    const response = await axios.get(API_ENDPOINTS.FURNITURES_LIST);

    return response.data.furnitures;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getFurnituresID(id) {
  try {
    const response = await axios.get(`${API_ENDPOINTS.FURNITURE_ITEM}${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategory() {
  try {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES_LIST);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

