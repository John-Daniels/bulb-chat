import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { toastOptions } from "./constants/toastify.constant";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ChooseAvater from "./pages/ChooseAvater/ChooseAvater";
import PrivateRoute from "./components/PrivateRoutes";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Chat />} />
            <Route path="/avater" element={<ChooseAvater />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer {...toastOptions} />
    </Provider>
  );
};

export default App;
