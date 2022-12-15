import React, { useState } from "react";
import logo from "../../assets/bulb.png";
import "./Contacts.scss";
import { loadBase64Img } from "../../helpers/index.helper";
import { ProfileState } from "../../store/profile.slice";

type ContactsProps = {
  contacts: any[];
  user: ProfileState;
  changeChat: any;
};

const Contacts = ({ contacts, user, changeChat }: ContactsProps) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div id="contacts">
      <div className="brand">
        <img src={logo} alt="logo" />
        <h3>Bulby</h3>
      </div>

      <div className="contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              className={`contact ${
                index == currentSelected ? "selected" : ""
              }`}
              key={index}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avater">
                <img
                  src={contact.avater ? loadBase64Img(contact.avater) : logo}
                  alt=""
                />
              </div>

              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="current-user">
        <div className="avater">
          <img src={loadBase64Img(user.avater!)} alt="" />
        </div>
        <div className="username">
          <h2>{user.username}</h2>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
