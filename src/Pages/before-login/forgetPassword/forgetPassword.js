import React, { useState, useEffect } from "react";
import Styles from "./forgotPassword.module.scss";
import { Layout } from "../../../components/common";
import {
  Button,
  Heading,
  Image,
  Input,
  Text,
} from "../../../components/shared";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { forgetPasswordApi } from "../../../service/auth";
import {
  ERROR_MESSAGES_LOGIN,
  initialValueLogin,
  sixDigitRandomNumber,
} from "../../../helpers/constant";
import { setLogin, setOtp } from "../../../redux/AuthRedux/auth";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValueLogin);
  const [errors, setErrors] = useState(initialValueLogin);
  const [loading, setLoading] = useState(false);
  const [getModal, setModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    let formValid = true;
    const newErrors = {};
    if (formData.email.trim() === "") {
      newErrors.email = ERROR_MESSAGES_LOGIN.emailRequired;
      formValid = false;
    }
    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    try {
      formData.otp = sixDigitRandomNumber;
      setLoading(true);
      dispatch(setOtp({ otp: formData.otp, email: formData.email }));
      const { data } = await forgetPasswordApi(formData);
      if (data.success) {
        setFormData(initialValueLogin);
        setErrors(initialValueLogin);
        dispatch(setLogin(data.data));
        // toast.success(data.message, { autoClose: 2000 });
        setModal(true);
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Sever  Error", { autoClose: 2000 });
    } finally {
      setModal(true);

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

  useEffect(() => {
    if (getModal === false) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [getModal]);

  return (
    <Layout>
      <div className={`${Styles.login} ${Styles.signup}`}>
        <div className={`${Styles.center}`}>
          <div
            className={`${Styles.row} ${Styles.formRow} ${Styles.alignItemsCenter}`}
          >
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
                    headingText={"Forget The Password"}
                    className={`${Styles.loginHeading}`}
                    strong="strong5"
                  />
                  <Text
                    color="black"
                    variant="lgText"
                    strong="strong4"
                    className={`${Styles.dBlock} ${Styles.enterDetail}`}
                  ></Text>
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
                      <Text className={`${Styles.errorMessage}`}>
                        {errors.email}
                      </Text>
                    </div>
                    <div
                      className={`${Styles.btnWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
                    >
                      <Button type="submit" variant="redBtn" disabled={loading}>
                        {loading ? "Submit in..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {getModal && (
        <div className={`${Styles.modalOverlay}`}>
          <div className={`${Styles.modalBody}`}>
            <div className={`${Styles.modalHeader} ${Styles.textCenter}`}>
              <div className={`${Styles.dFlex}`}>
                <div className={`${Styles.filterCheckWrapper} ${Styles.otpTextView}`}>
                 <p>
                 An OTP has been sent to your email for updating your account
                  password. You should have received an email containing a link.
                  By clicking on that link, you'll be directed to a form where
                  you can enter the OTP and update your password. This process
                  strengthens our security measures and keeps your account safe.
                  <br />
                  Please note, the OTP can only be used once and is valid for a
                  limited time, so please use it promptly.
                  <br />
                 </p>
                  <div
                    className={`${Styles.btnWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
                  >
                    <Button variant="redBtn" onClick={() => setModal(false)}>
                      OK
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ForgetPassword;
