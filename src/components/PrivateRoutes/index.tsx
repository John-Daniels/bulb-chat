import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../constants/api.constant";
import { profileStorageKey } from "../../constants/index.constant";
import useRequest from "../../hooks/request.hook";
import { useAppSelector } from "../../store";
import {
  profileLogoutAction,
  profileUpdateAction,
} from "../../store/profile.slice";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const makeRequest = useRequest();
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.profileSlice?.accessToken);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    makeRequest
      .get(API.profile)
      .then((res) => {
        const {
          data: { data },
        } = res;

        // if (res.status == 200) {
        data && dispatch(profileUpdateAction(data));
        // }
      })
      .catch((e) => {
        const notAuth = [401, 403];
        const res = e.response;
        if (notAuth.includes(res.status)) {
          dispatch(profileLogoutAction());
          toast("try login again!");
          navigate("/login");
        }
      });
  };

  const isAuth = token ? true : false;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
