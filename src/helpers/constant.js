
export const API_BASE_URL = 'https://.com/ci/api'

export   const initialValueLogin = {
    email: '',
    password: ''
  }

  export const ERROR_MESSAGES_LOGIN = {
    emailRequired: 'Please enter your email or phone number',
    passwordRequired: 'Please enter your password',
    loginSuccess: 'Login successful',
    loginFailed: 'Login failed'
  };

  // constants.js

export const LOGIN_SUCCESS_MESSAGE = "Register successful";
export const LOGIN_ERROR_MESSAGE = "Register failed";

export const FORM_ERRORS = {
  name: "Please enter your name",
  email_id: "Please enter your email",
  phone: "Please enter your phone number",
  password: "Please enter your password",
};


export const sixDigitRandomNumber = Math.floor(100000 + Math.random() * 900000);


export const convertToTime = (distance,speed) => {
  const distanceInMeters = parseFloat(distance);
  const speedInMetersPerMinute = parseFloat(speed);

  if (!isNaN(distanceInMeters) && !isNaN(speedInMetersPerMinute)) {
    const timeInMinutes = distanceInMeters / speedInMetersPerMinute;
    const data =Math.floor(parseFloat(timeInMinutes))
    return data || 0;
  } else {
    return 0;
  }
};
