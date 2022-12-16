import React, { useState } from "react";
import "./ChatInput.scss";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";

const ChatInput = ({ handleSend }: any) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    let message = msg;
    message += emojiData.emoji;
    setMsg(message);
  };

  const send = (e: any) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSend(msg);
      setMsg("");
    }
  };

  return (
    <div id="chat-input">
      <div className="button-container">
        <div className="emoji">
          <IconButton size="small" onClick={handleEmojiPickerHideShow}>
            <BsEmojiSmileFill />
          </IconButton>

          {showEmojiPicker && (
            <Picker width={300} height={340} onEmojiClick={handleEmojiClick} />
          )}
        </div>
      </div>

      <form className="input-container" onSubmit={send}>
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="sumbit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
