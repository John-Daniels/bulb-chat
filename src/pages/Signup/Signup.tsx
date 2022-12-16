import React, { ChangeEventHandler, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import logo from "../../assets/bulb.png";
import useRequest from "../../hooks/request.hook";
import API from "../../constants/api.constant";
import { toast } from "react-toastify";
import { ResponsePayload } from "../../utils/types/response.type";
import { profileStorageKey } from "../../constants/index.constant";
import { useDispatch } from "react-redux";
import { profileLoginAction } from "../../store/profile.slice";

const Signup = () => {
  const navigate = useNavigate();
  const makeRequest = useRequest();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const { data: res } = await makeRequest.post(API.signup, form);
        const { status, message, data } = res as ResponsePayload;

        // const user = JSON.stringify(data);
        // localStorage.setItem(profileStorageKey, user);
        data && dispatch(profileLoginAction(data));
        navigate("/");
      } catch ({ response: { data: res } }) {
        const { status, message, data } = res as ResponsePayload;
        if (status == "error") {
          data && Object.keys(data).map((key) => toast.error(data[key]));
        }
      }
    }
  };

  const handleChange = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = form;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters");
      return false;
    } else if (password.length < 8) {
      toast.error("Username should be equal or greater than 8 characters");
      return false;
    } else if (email === "") {
      toast.error("Email is required!");
      return false;
    }
    return true;
  };

  return (
    <div id="signup" className="signup">
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={logo} alt="" />
          <h1>Bulby Chat</h1>
        </div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
