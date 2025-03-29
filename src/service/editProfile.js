import axios from "axios";
import { API_BASE_URL } from "../helpers/constant";

const updateUserProfileApi = async(params) => {
      let data = JSON.stringify({
        ...params
    });
        
        let config = {
          method: 'post',
          url: `${API_BASE_URL}/profileupdate`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
      return await axios.request(config);
}

export {
    updateUserProfileApi
}