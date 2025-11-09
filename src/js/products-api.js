import axios from 'axios';

const API_BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
const API_ENDPOINTS = {
  FURNITURES_LIST: '/furnitures',
  FURNITURE_ITEM: '/furnitures/',
  CATEGORIES_LIST: '/categories',
  USERS_ORDER: '/orders',
  FEEDBACKS: '/feedbacks',
};

axios.defaults.baseURL = API_BASE_URL;

export async function getFurnituresList(categoryID) {
  const params = {
    category: categoryID,
  };

  try {
    const response = await axios.get(API_ENDPOINTS.FURNITURES_LIST, { params });
    return response.data.furnitures;
  } catch (error) {
    console.error('Failed to fetch furniture list.', error);
    throw new Error('Failed to load furniture list.');
  }
}

export async function getFurnituresID(id) {
  try {
    const response = await axios.get(`${API_ENDPOINTS.FURNITURE_ITEM}${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch furniture item.', error);
    throw new Error('Item not found.');
  }
}

export async function getPopularItems(page = 1) {
  try {
    const params = {
      type: "popular",
      limit: 4,
      page
    }

    const response = await axios.get(API_ENDPOINTS.FURNITURES_LIST, { params })
    return response.data.furnitures
  } catch (error) {
    console.error('Failed to fetch popular furniture items:', error);
    throw new Error('Failed to load popular items.');
  }
}

export async function getCategory() {
  try {
    const response = await axios.get(API_ENDPOINTS.CATEGORIES_LIST);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories.', error);
    throw new Error('Failed to load categories.');
  }
}

export async function postUsersOrder(orderData) {
  try {
    const response = await axios.post(API_ENDPOINTS.USERS_ORDER, orderData);
    return response.data;
  } catch (error) {
    console.error('Failed to post order.', error);
    throw new Error('Order submission failed.');
  }
}

export async function getFeedback(page) {
  try {
    const params = {
      limit: 10,
      page,
    };

    const response = await axios.get(API_ENDPOINTS.FEEDBACKS, { params });
    return response.data.feedbacks;
  } catch (error) {
    console.error('Failed to fetch feedbacks.', error);
    throw new Error('Fetch feedbacks data error')

  }
}

