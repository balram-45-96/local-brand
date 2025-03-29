import React, { useEffect, useState } from "react";
import Styles from '../login/login.module.scss';
import { Layout } from "../../../components/common";
import { Button, Heading, Image, Input, Text } from "../../../components/shared";
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { loginApiFun } from "../../../service/auth";
import { ERROR_MESSAGES_LOGIN, initialValueLogin }
 from "../../../helpers/constant";
import { setLogin } from "../../../redux/AuthRedux/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValueLogin);
  const [errors, setErrors] = useState(initialValueLogin);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    let formValid = true;
    const newErrors = {};
    if (formData.email.trim() === '') {
      newErrors.email = ERROR_MESSAGES_LOGIN.emailRequired;
      formValid = false;
    }
    if (formData.password.trim() === '') {
      newErrors.password = ERROR_MESSAGES_LOGIN.passwordRequired;
      formValid = false;
    }
    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      const { data } = await loginApiFun(formData);
      if (data.success) {
        setFormData(initialValueLogin);
        setErrors(initialValueLogin);
        console.log('data.data: ', data.data);
        dispatch(setLogin(data.data));
        toast.success(ERROR_MESSAGES_LOGIN.loginSuccess, { autoClose: 2000 });
        setTimeout(()=>{
          navigate('/');
        },2000)
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES_LOGIN.loginFailed, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  return (
    <Layout>
      <div className={`${Styles.login} ${Styles.signup}`}>
        <div className={`${Styles.center}`}>
          <div className={`${Styles.row} ${Styles.formRow} ${Styles.alignItemsCenter}`}>
            <div className={`${Styles.w50} ${Styles.imgBox}`}>
              <Image src="assets/image/appmobile.png" alt="mobile image"
                className={`${Styles.mAuto} ${Styles.dBlock} ${Styles.w100} ${Styles.mobileImage}`}
              />
            </div>
            <div className={`${Styles.w50} ${Styles.loginFormWrapper}`}>
              <div className={`${Styles.loginInnerWrapper} ${Styles.mAuto}`}>
                <form onSubmit={handleSubmit}>
                  <Heading
                    color="black"
                    headingType={"h2"}
                    headingText={"Log in to Exclusive"}
                    className={`${Styles.loginHeading}`}
                    strong="strong5"
                  />
                  <Text color="black" variant="lgText" strong="strong4" className={`${Styles.dBlock} ${Styles.enterDetail}`}>
                    Enter your details below
                  </Text>
                  <div className={`${Styles.formWrapper}`}>
                    <div className={`${Styles.inputBox}`}>
                      <Input
                        placeholder="Email"
                        variant="primaryInput"
                        className={`${Styles.w100}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <Text className={`${Styles.errorMessage}`}>{errors.email}</Text>
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
                      <Text className={`${Styles.errorMessage}`}>{errors.password}</Text>
                    </div>
                    <div className={`${Styles.btnWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}>
                      <Button type="submit" variant="redBtn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'} {/* Show loading text if loading is true */}
                      </Button>
                      <div className={`${Styles.haveAccountWrapper} ${Styles.textCenter}`}>
                        <Link to="/forgetPassword"><Text color="red">Forget Password?</Text></Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;
