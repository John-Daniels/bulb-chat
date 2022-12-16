import React, { ChangeEventHandler, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/bulb.png";
import useRequest from "../../hooks/request.hook";
import API from "../../constants/api.constant";
import { toast } from "react-toastify";
import { ResponsePayload } from "../../utils/types/response.type";
import { profileStorageKey } from "../../constants/index.constant";
import { useDispatch } from "react-redux/es/exports";
import { profileUpdateAction } from "../../store/profile.slice";
import { getItem } from "../../helpers/storage.helper";

const Login = () => {
  const makeRequest = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (getItem(profileStorageKey)) navigate("/");
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const { data: res } = await makeRequest.post(API.login, form);
        const { status, message, data } = res as ResponsePayload;

        data && dispatch(profileUpdateAction(data));
        navigate("/");
      } catch ({ response: { data: res } }) {
        const { status, message, data } = res as ResponsePayload;
        if (status == "error") {
          message && toast.error(message);
        }
      }
    }
  };

  const handleChange = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleValidation = () => {
    const { password, username } = form;

    if (username === "") {
      toast.error("username is required!");
      return false;
    } else if (password === "") {
      toast.error("password is required!");
      return false;
    }

    return true;
  };

  return (
    <div id="login" className="login">
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
          min="3"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
          Already have an account ? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
