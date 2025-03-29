import axios from "axios";
import { API_BASE_URL } from "../helpers/constant";

const classifiedSubCategoryApiById = async (id) => {
  let config = {
    method: "get",
    url: `${API_BASE_URL}/classifiedSubCategory/${id}`,
    headers: {},
  };
  return await axios.request(config);
};


const getFavoritesApi = async (id) => {
  let config = {
    method: "get",
    url: `${API_BASE_URL}/getFavorites?user_id=${id}`,
    headers: {},
  };
  return await axios.request(config);
};

const addToFavoriteApi = async (user_id, vender_id) => {
  let data = new FormData();
  data.append("user_id", user_id);
  data.append("vender_id", vender_id);
  let config = {
    method: "post",
    url: `${API_BASE_URL}/addToFavorite`,
    headers: {},
    data : data
  };
  return await axios.request(config);
};

export { classifiedSubCategoryApiById, addToFavoriteApi,getFavoritesApi };
