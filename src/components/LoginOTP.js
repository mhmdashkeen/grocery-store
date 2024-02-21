import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { signInWithPhoneNumber, RecaptchaVerifier } from "@firebase/auth";
import { auth } from "../firebase-config";

const formObject = {
  phone: ""
  } 
const LoginOTP = () => {
    const [formValues, setFormValues] = useState(formObject);
    const [otpResult, setOtpResult] = useState("");
    const [verifyButton, setVerifyButton] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const phoneNumber = "+918700529158";

    const submitForm = async (e) => {
        e.preventDefault();
        const { phone, otp } = formValues;
        if(!window.recaptchaVerifier){
          window.recaptchaVerifier = new RecaptchaVerifier(auth,
            "recaptcha-container",
            {
              size: "invisible",
            }
          );
     }
    window.recaptchaVerifier.render();
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
          .then((confirmationResult) => {
            setOtpResult(confirmationResult);
            setVerifyButton(true);
            console.log("OOOO", confirmationResult)
          })
          .catch((error) => { 
            console.log("error", error);
          });
      };

    const handleVerifyOtp = () => {
      const { otp } = formValues;
      otpResult
      .confirm(otp)
      .then((result) => {
        console.log("Verified", result);
      })
      .catch((error) => {
        console.log("Not Verified", error);
      });
    }

    return (
        <div className="submit-form">
          <form onSubmit={submitForm}>
          {!verifyButton ? <div className="form-group">
              <label htmlFor="description">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                value={formValues.phone}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                  ...prevState,
                  phone: e.target.value
                  }))
                }}
                name="phone"
              />
              </div> :
            <div className="form-group">
              <label htmlFor="description">Enter OTP</label>
              <input
                type="number"
                className="form-control"
                id="otp"
                value={formValues.otp}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                  ...prevState,
                  otp: e.target.value
                  }))
                }}
                name="otp"
              />
            </div>}
            <div id="recaptcha-container"></div>
            {!verifyButton ? <button
            type='submit'
            className="btn btn-success">
              Send OTP
            </button> : <button
            type='button'
            onClick={handleVerifyOtp}
            className="btn btn-success">
              Verify OTP
            </button>}
          </form>
      </div>
    );
}
 
export default React.memo(LoginOTP);