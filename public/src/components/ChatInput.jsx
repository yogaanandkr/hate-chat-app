import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import Picker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import { setBadWordsCount } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

export default function ChatInput({ handleSendMsg }) {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // const badWordFilter = async (msg) => {
  //   const encodedParams = new URLSearchParams();
  //   encodedParams.append("censor-character", "*");
  //   encodedParams.append(
  //     msg,
  //     "This text does not actually contain any bad words!"
  //   );

  //   const options = {
  //     method: "POST",
  //     url: "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
  //     headers: {
  //       "content-type": "application/x-www-form-urlencoded",
  //       "X-RapidAPI-Host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
  //       "X-RapidAPI-Key": "4ce48b2375msh4b25510400d9553p1cb639jsn72d4a91980be",
  //     },
  //     data: encodedParams,
  //   };

  //   let resp = await axios.request(options);

  //   console.log("Response da mavane", resp.data);
  // };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    var Filter = require("bad-words"),
      filter = new Filter();

    // console.log(filter.clean("Don't be an assh0le"));
    if (msg.length > 0) {
      // badWordFilter(msg);
      let encodedMsg = filter.clean(msg);
      // handleSendMsg(encodedMsg);
      badWordApi(msg);
      setMsg("");
    }
  };

  const badWordApi = (msg) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("censor-character", "*");
    encodedParams.append("content", msg);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
        "X-RapidAPI-Key": "4ce48b2375msh4b25510400d9553p1cb639jsn72d4a91980be",
      },
      body: encodedParams,
    };

    fetch(
      "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log("Message", msg);
        // console.log("decoded", response["censored-content"]);

        handleSendMsg(response["censored-content"]);
        console.log(response);
        console.log(response["censored-content"].includes("*"));
        if (response["censored-content"].includes("*")) {
          toast.warning(
            "message contain hate. Please be kind to others",
            toastOptions
          );

          console.log(response["bad-words-total"]);
          setBad();
        }
      })
      .catch((err) => console.error(err));
  };

  const setBad = async () => {
    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    console.log("Before");
    const { data } = await axios.post(`${setBadWordsCount}/${user._id}`, {});
    console.log("After");

    console.log("count data", data.banned);

    if (data.banned) {
      toast.error("Your account has been banned");
      setTimeout(() => {
        localStorage.clear();
        //  navigate("/login");
        navigate("/banned");
      }, 5000);
      // setTimeout(() => {
      //   navigate("/login");
      // }, 5000);
    }
  };

  return (
    <>
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #06d6a0;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
