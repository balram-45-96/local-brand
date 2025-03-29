import React, { useState } from "react";
import Styles from "../login/login.module.scss";
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

import { forgetPasswordApi, updatePasswordApi } from "../../../service/auth";
import {
  ERROR_MESSAGES_LOGIN,
  initialValueLogin,
  sixDigitRandomNumber,
} from "../../../helpers/constant";
import { setLogin } from "../../../redux/AuthRedux/auth";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { MuiOtpInput } from "mui-one-time-password-input";

const UpdatePassword = () => {
  const initialValue = {
    email_id: "",
    otp: "",
    password: "",
    conPas: "",
  };
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = React.useState("");
  const [otpVerify, setOtpVerify] = React.useState("");

  const handleChangeOtp = (newValue) => {
    setOtp(newValue);
  };

  const verifyOTP = () => {
    console.log("Verifying OTP:", otp);
    // Implement OTP verification logic here
    if (otp.trim() === "" || otp != auth.otp) {
      toast.error("Invalid OTP !", { autoClose: 2000 });
    } else {
      setOtpVerify(true);
      toast.success("Otp verify  !", { autoClose: 2000 });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    let formValid = true;
    const newErrors = {};

    if (formData.email_id.trim() === "") {
      newErrors.email_id = ERROR_MESSAGES_LOGIN.emailRequired;
      formValid = false;
    }

    console.log("formData.otp: ", formData.otp);
    console.log("auth.otp: ", auth.otp);

    if (formData.password.trim() === "") {
      newErrors.password = "New Password is required";
      formValid = false;
    }

    if (
      formData.conPas.trim() === "" ||
      formData.password !== formData.conPas
    ) {
      newErrors.conPas = "Passwords do not match";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const { data } = await updatePasswordApi(formData);
      if (data.data) {
        setFormData(initialValue);
        setErrors(initialValue);
        toast.success("Password update success !", { autoClose: 2000 });
        dispatch(setOtp({ otp: formData.otp, email: formData.email }));
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Password update failed !", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Server Error", { autoClose: 2000 });
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
            {otpVerify && (
              <div className={`${Styles.w50} ${Styles.loginFormWrapper}`}>
                <div className={`${Styles.loginInnerWrapper} ${Styles.mAuto}`}>
                  <form onSubmit={handleSubmit}>
                    <Heading
                      color="black"
                      headingType={"h2"}
                      headingText={"Updated The Password"}
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
                          placeholder="New Password"
                          variant="primaryInput"
                          type="password"
                          className={`${Styles.w100}`}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <Text className={`${Styles.errorMessage}`}>
                          {errors.password}
                        </Text>
                      </div>
                      <div className={`${Styles.inputBox}`}>
                        <Input
                          placeholder="Confirm Password"
                          variant="primaryInput"
                          type="password"
                          className={`${Styles.w100}`}
                          name="conPas"
                          value={formData.conPas}
                          onChange={handleChange}
                        />
                        <Text className={`${Styles.errorMessage}`}>
                          {errors.conPas}
                        </Text>
                      </div>
                      <div
                        className={`${Styles.btnWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
                      >
                        <Button
                          type="submit"
                          variant="redBtn"
                          disabled={loading}
                        >
                          {loading ? "Submit in..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {!otpVerify && (
              <div className={`${Styles.w50} ${Styles.loginFormWrapper}`}>
                <div className={`${Styles.loginInnerWrapper} ${Styles.mAuto}`}>
                  <h2>OTP Verification</h2>
                  <p>Enter the OTP sent to your phone</p>
                  <MuiOtpInput
                    length={6}
                    value={otp}
                    onChange={handleChangeOtp}
                  />
                  <br />
                  <div
                    className={`${Styles.btnWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
                  >
                    <Button variant="redBtn" onClick={verifyOTP}>
                      Verify OTP
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePassword;
