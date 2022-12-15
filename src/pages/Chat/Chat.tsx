import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import Contacts from "../../components/Contacts/Contacts";
import Welcome from "../../components/Welcome/Welcome";
import API from "../../constants/api.constant";
import useRequest from "../../hooks/request.hook";
import { useAppSelector } from "../../store";
import { ProfileState } from "../../store/profile.slice";
import "./Chat.scss";

const Chat = () => {
  const makeRequest = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // userdata
  const user = useAppSelector((state) => state.profileSlice) as ProfileState;

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(undefined);

  useEffect(() => {
    if (!user.avater) navigate("/avater");
  }, []);

  useEffect(() => {
    makeRequest.get(API.allUsersRoute).then(({ data }) => {
      setContacts(data.data);
    });
  }, []);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <div id="chat">
      <div className="container">
        <Contacts
          contacts={contacts}
          user={user}
          changeChat={handleChatChange}
        />

        {currentChat ? <ChatContainer /> : <Welcome user={user} />}
      </div>
    </div>
  );
};

export default Chat;
