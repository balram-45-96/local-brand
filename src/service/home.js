import axios from "axios";
import { API_BASE_URL } from "../helpers/constant";



const sidlerListApi = async () =>{
    let config = {
        method: 'get',
        url: `${API_BASE_URL}/slider/1`,
        headers: { }
      };
      return await axios.request(config);
}

const debouncedSearchApi= async (value, myLat, myLon, zone_id)=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/shopSearch?myLat=${myLat}&myLon=${myLon}&search=${value}&zone_id=${zone_id}`,
    headers: { }
  };
  return await axios.request(config);
}

const getZoneApi= async (myLat, myLon)=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/getZone/?myLat=${myLat}&myLon=${myLon}`,
    headers: { }
  };
  return await axios.request(config);
}

// getAddressList?user_id=1
const getAddressListApi= async (user_id)=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/getAddressList?user_id=${user_id}`,
    headers: { }
  };
  return await axios.request(config);
}

const getCouponsApi= async ()=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/coupons`,
    headers: { }
  };
  return await axios.request(config);
}


const getAllCategoryApiById= async (id)=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/getAllCategory/${id}`,
    headers: { }
  };
  return await axios.request(config);
}

const getAllClasifiedCategoryApi= async (id)=>{
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/getAllClasifiedCategory`,
    headers: { }
  };
  return await axios.request(config);
}


export {
  sidlerListApi,
  debouncedSearchApi,
  getAllCategoryApiById,
  getZoneApi,
  getAllClasifiedCategoryApi,
  getCouponsApi,
  getAddressListApi,
}