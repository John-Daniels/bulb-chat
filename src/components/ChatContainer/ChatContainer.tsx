import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noImg from "../../assets/bulb.png";
import { loadBase64Img } from "../../helpers/index.helper";
import useRequest from "../../hooks/request.hook";
import ChatInput from "../ChatInput/ChatInput";
import Logout from "../Logout/Logout";
import Messages from "../Messages/Messages";
import "./ChatContainer.scss";
import { useDispatch } from "react-redux";
import API from "../../constants/api.constant";
import { ProfileState } from "../../store/profile.slice";
import { useAppSelector } from "../../store";
import useSocket from "../../hooks/socket.hook";
import { v4 as uuid } from "uuid";

const getUserRoom = (users: string[]) => users.sort().join("_");

const ChatContainer = ({ chat }: { chat: any }) => {
  const navigate = useNavigate();
  const makeRequest = useRequest();
  const dispatch = useDispatch();
  const socket = useSocket();

  const scrollRef = useRef<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);

  // userdata
  const user = useAppSelector((state) => state.profileSlice) as ProfileState;
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    fetchMessages();
    socket.emit("join-users", [user.username, chat.username]);

    return () => {
      socket.emit("leave-room", getUserRoom([user.username, chat.username]));
    };
  }, [chat]);

  const fetchMessages = async () => {
    const { data } = await makeRequest.get(
      `${API.getUserMessages}/${chat._id}`
    );
    setMessages(data.data);
  };

  const handleSendMsg = async (msg: any) => {
    await makeRequest.post(API.sendMsg, {
      from: user._id,
      to: chat._id,
      message: msg,
    });

    socket.emit("send-msg", {
      to: chat.username,
      from: user.username,
      message: msg,
    });

    setMessages((prev) => {
      const msgs = [...prev];
      msgs.push({ fromSelf: true, message: msg });
      return msgs;
    });
  };

  useEffect(() => {
    socket.on("msg-receive", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });
  }, [chat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div id="chat-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avater">
            <img
              src={chat.avater ? loadBase64Img(chat.avater) : noImg}
              alt="avater"
            />
          </div>
          <div className="username">
            <h3>{chat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      {/* <Messages /> */}
      <div className="chat-messages">
        {messages.map((message: any, index) => (
          <div key={index}>
            <div
              className={`message ${message.fromSelf ? "sent" : "recieved"} `}
              key={index}
              ref={scrollRef}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSend={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
