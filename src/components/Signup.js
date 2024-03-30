import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup } from '../slice/User';
import { toast } from 'react-toastify';

const formObject = {
    name: "",
    email: "",
    password: ""
} 
const Signup = () => {
    const [formValues, setFormValues] = useState(formObject);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = e => {
        e.preventDefault();
        const { name, email, password } = formValues;
          dispatch(signup({ name, email, password }))
          .unwrap()
          .then((data) => {
            console.log("Response Data", data);
            navigate("/");
          })
          .catch((e) => {
            toast(e.message);
          })
      }

    return (
        <div className="submit-form">
          <form onSubmit={submitForm}>
          <div className="form-group">
              <label htmlFor="description">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                minLength="3"
                value={formValues.name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                  ...prevState,
                  name: e.target.value
                  }))
                }}
                name="name"
              />
            </div>
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
                minLength="8"
                required
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
              Signup
            </button>
          </form>
         {/* )} */}
      </div>
    );
}
 
export default React.memo(Signup);