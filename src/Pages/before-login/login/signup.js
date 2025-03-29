// Login.js

import React, { useState } from "react";
import Styles from "./login.module.scss";
import { Layout } from "../../../components/common";
import {
  Button,
  Heading,
  Image,
  Input,
  Text,
} from "../../../components/shared";
import { Link, useNavigate } from "react-router-dom";
import { signupApiFun } from "../../../service/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLoginButton from "../../../components/GoogleLoginButton";
import { ERROR_MESSAGES_LOGIN, FORM_ERRORS, LOGIN_ERROR_MESSAGE, LOGIN_SUCCESS_MESSAGE } from "../../../helpers/constant";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email_id: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email_id: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    let formValid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = FORM_ERRORS.name;
      formValid = false;
    }

    if (formData.email_id.trim() === "") {
      newErrors.email_id = FORM_ERRORS.email_id;
      formValid = false;
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = FORM_ERRORS.phone;
      formValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = FORM_ERRORS.password;
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await signupApiFun(formData);
      toast.success(LOGIN_SUCCESS_MESSAGE); // Use the constant here
      setTimeout(() => {
        navigate('/login');
      }, 2000)
      setFormData({
        name: "",
        email_id: "",
        phone: "",
        password: "",
      });
      setErrors({
        name: "",
        phone: "",
        email_id: "",
        password: "",
      });
    } catch (error) {
      toast.error(LOGIN_ERROR_MESSAGE); // Use the constant here
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  return (
    <Layout>
      <div className={Styles.login}>
        <ToastContainer />
        <div className={`${Styles.center}`}>
          <div className={`${Styles.row} ${Styles.formRow}`}>
            <div className={`${Styles.w50} ${Styles.imgBox}`}>
              <Image
                src="assets/image/appmobile.png"
                alt="mobile image"
                className={`${Styles.mAuto} ${Styles.dBlock} ${Styles.w100} ${Styles.mobileImage}`}
              />
            </div>
            <div className={`${Styles.w50} ${Styles.loginFormWrapper}`}>
              <div className={`${Styles.loginInnerWrapper} ${Styles.mAuto}`}>
                <form onSubmit={handleSubmit}>
                  <Heading
                    color="black"
                    headingType={"h2"}
                    headingText={"Create an account"}
                    className={`${Styles.loginHeading}`}
                    strong="strong5"
                  />
                  <Text
                    color="black"
                    variant="smText"
                    strong="strong4"
                    className={`${Styles.dBlock} ${Styles.enterDetail}`}
                  >
                    Enter your details below
                  </Text>
                  <div className={`${Styles.formWrapper}`}>
                    <div className={`${Styles.inputBox}`}>
                      <Input
                        placeholder="Name"
                        variant="primaryInput"
                        className={`${Styles.w100}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Text className={`${Styles.errorMessage}`}>
                        {errors.name}
                      </Text>
                    </div>
                    <div className={`${Styles.inputBox}`}>
                      <Input
                        placeholder="Email"
                        variant="primaryInput"
                        type="email"
                        className={`${Styles.w100}`}
                        name="email_id"
                        value={formData.email_id}
                        onChange={handleChange}
                      />
                      <Text className={`${Styles.errorMessage}`}>
                        {errors.email_id}
                      </Text>
                    </div>
                    <div className={`${Styles.inputBox}`}>
                      <Input
                        placeholder="Phone Number"
                        variant="primaryInput"
                        className={`${Styles.w100}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <Text className={`${Styles.errorMessage}`}>
                        {errors.phone}
                      </Text>
                    </div>
                    <div className={`${Styles.inputBox}`}>
                      <Input
                        placeholder="Password"
                        type="password"
                        variant="primaryInput"
                        className={`${Styles.w100}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <Text className={`${Styles.errorMessage}`}>
                        {errors.password}
                      </Text>
                    </div>
                    <div className={`${Styles.btnWrapper}`}>
                      <Button
                        type="submit"
                        variant="redBtn"
                        className={`${Styles.w100}`}
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                      {/* <Button
                        variant="primaryOutline"
                         */}
                      {/* > */}
                        {/* <Image
                          src="assets/image/icon/icon-Google.svg"
                          className={`${Styles.mr15}`}
                        />{" "} */}
                        <GoogleLoginButton className={`${Styles.w100}`} variant='primaryOutline' />
                      {/* </Button> */}
                    </div>
                    <div
                      className={`${Styles.haveAccountWrapper} ${Styles.textCenter}`}
                    >
                      <Text variant="lgText" strong="strong4">
                        Already have account?
                      </Text>
                      <Link to="/login">Log in</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
