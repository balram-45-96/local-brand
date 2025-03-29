import axios from "axios";
import { API_BASE_URL } from "../helpers/constant";

const getCartListApi = async(userId) => {
        
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/getCartList?user_id=${userId}`,
    headers: { 
    },
  };
return await axios.request(config);
}

const deleteAddressApi = async(id) => {
        
  let config = {
    method: 'get',
    url: `${API_BASE_URL}/deleteAddress/${id}`,
    headers: { 
    },
  };
return await axios.request(config);
}

const stripurlApi = async(url) => {
        
  let config = {
    method: 'get',
    url,
    headers: { 
    },
  };
return await axios.request(config);
}

const handleAddAddressApi = async(formData, auth) => {
  let data = new FormData();
  data.append('user_id', auth.user.id);
  data.append('address', formData.address);
  data.append('latitude', auth.myLat);
  data.append('longitude', auth.myLon);
  data.append('isDefault', '1');
  data.append('name', auth.user.name);
  data.append('phone', formData.phone);
  let config = {
    method: 'post',
    url: `${API_BASE_URL}/addAddress`,
    headers: { 
    },
    data : data
  };
return await axios.request(config);
}

export {
    getCartListApi,
    handleAddAddressApi,
    stripurlApi,
    deleteAddressApi,
}