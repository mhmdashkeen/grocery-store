import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../slice/User';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const formObject = {
    email: "",
    password: ""
} 
const Login = () => {
    const [formValues, setFormValues] = useState(formObject);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const submitForm = (e) => {
        e.preventDefault();
        const { email, password } = formValues;
          dispatch(signin({ email, password }))
          .unwrap()
          .then(() => {
            if(location.state !== null){
              navigate(location.state.from.pathname);
            }else {
              navigate("/");
            }
          })
          .catch((e) => {
            console.log("API Error", e);
            toast(e.message);
          })
      }
    return (
        <div className="submit-form">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={formValues.email}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                  ...prevState,
                  email: e.target.value
                  }))
                }}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                minLength="8"
                value={formValues.password}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                  ...prevState,
                  password: e.target.value
                  }))
                }}
                name="password"
              />
            </div>

            <button
            type='submit'
            className="btn btn-success">
              Login
            </button>
          </form>
      </div>
    );
}
 
export default React.memo(Login);