  import axios from "axios";
import { API_BASE_URL } from "../helpers/constant";


const updatePasswordApi = async (formData) => {
  let data = JSON.stringify({
    "password":formData.password,
    "email_id":formData.email_id
});
    let config = {
      method: 'post',
      url: `${API_BASE_URL}/updatePassword`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
  return await axios.request(config);
}

  const loginApiFun = async (formData) => {
      let data = JSON.stringify({
        ...formData
    });
        let config = {
          method: 'post',
          url: `${API_BASE_URL}/login`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
      return await axios.request(config);
  }

  const forgetPasswordApi = async (formData) => {
    let data = new FormData();
    data.append('email', formData.email);
    data.append('otp', formData.otp);
    data.append('type', 'user');


      let config = {
        method: 'post',
        url: `https://.com/ci/Email/resetPassword/`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return await axios.request(config);
}

  const signupApiFun = async (formData) => {
    let data = JSON.stringify({
        ...formData
      });
      
      let config = {
        method: 'post',
        url: `${API_BASE_URL}/register`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return await axios.request(config);
  }

  const settingApi = async () =>{
    let config = {
        method: 'get',
        url: `${API_BASE_URL}/setting`,
        headers: { }
      };
      return await axios.request(config);
}

  export { loginApiFun, signupApiFun, settingApi, forgetPasswordApi, updatePasswordApi };
