import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@mui/material';

const AddressAutocomplete = ({setAddress , address}) => {
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setAddress(inputValue);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=AIzaSyAB_BiabQVCPTNCPgbszH4XXypbJImS4HE&types=address`
      );
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching address predictions:', error);
    }
  };

  const handlePredictionClick = (selectedAddress) => {
    setAddress(selectedAddress);
    setPredictions([]);
  };

  return (
    <div>
      <Input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter address"
      />
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.id} onClick={() => handlePredictionClick(prediction.description)}>
            {prediction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
