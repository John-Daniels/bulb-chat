import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/request.hook";
import loader from "../../assets/loader.gif";
import "./ChooseAvater.scss";

import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { profileStorageKey } from "../../constants/index.constant";
import { ResponsePayload } from "../../utils/types/response.type";
import API from "../../constants/api.constant";

const ChooseAvater = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const makeRequest = useRequest();
  const [avaters, setAvaters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvater, setSelectedAvater] = useState<any>(undefined);

  const setProfilePicture = async () => {
    if (selectedAvater === undefined) {
      toast.error("Please select an Avater");
    } else {
      const user = await JSON.parse(localStorage.getItem(profileStorageKey)!);
      try {
        const { data: res } = await makeRequest.post(API.avater, {
          avater: avaters[selectedAvater],
        });

        const { message } = res as ResponsePayload;
        toast(message);

        navigate("/");
      } catch ({ response: { data } }) {
        const { message } = data as ResponsePayload;
        if (message) toast.error(message);
      }
    }
  };

  useEffect(() => {
    fetchAvater();
  }, []);

  const fetchAvater = async () => {
    const data: any = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }

    setLoading(false);
    setAvaters(data);
  };

  return (
    <>
      <div id="avater">
        {loading ? (
          <img src={loader} alt="loader" className="loader" />
        ) : (
          <>
            <div className="title-container">
              <h1>Pick an avater as your profile picture</h1>
            </div>
            <div className="avaters">
              {avaters.map((avater, index) => {
                return (
                  <div
                    key={index}
                    className={`avater ${
                      selectedAvater === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avater}`}
                      alt="avater"
                      onClick={() => setSelectedAvater(index)}
                    />
                  </div>
                );
              })}
            </div>

            <button className="submit-btn" onClick={setProfilePicture}>
              Done
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ChooseAvater;
