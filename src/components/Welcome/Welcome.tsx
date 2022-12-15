import React from "react";
import "./Welcome.scss";
import Robot from "../../assets/robot.gif";

const Welcome = ({ user }: any) => {
  return (
    <div id="welcome">
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{user.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </div>
  );
};

export default Welcome;
