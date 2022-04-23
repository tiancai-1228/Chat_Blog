/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hook/useAppRedux";
import styles from "../../styles/Blog.module.css";
import useWebSocket from "react-use-websocket";

const { Search } = Input;
const blog = () => {
  const { userData } = useAppSelector((state) => state.account.value);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState<any>([]);
  const socketUrl = "wss://robby-websocket.herokuapp.com";
  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onMessage: (msg) => {
      // messageAry.push({
      //   isUser: msg.data.split(",")[0] === userData.name,
      //   msg: msg.data.split(",")[1],
      // });
      setComment([
        ...comment,
        {
          isUser: msg.data.split(",")[0] === userData.name,
          msg: msg.data.split(",")[1],
        },
      ]);
      console.log(msg.data.split(","));
    },
  });
  // let messageAry: { isUser: boolean; msg: string }[] = [];

  const messages = comment.map(
    (el: { isUser: boolean; msg: string }, index: number) =>
      el.isUser ? (
        <p className={styles.userMessage} key={index}>
          {el.msg}
        </p>
      ) : (
        <p className={styles.unUserMessage} key={index}>
          {el.msg}
        </p>
      )
  );

  useEffect(() => {
    console.log(comment);
  }, [comment]);
  return (
    <>
      <br />
      <div className={styles.contents}>
        {/* <p className={styles.userMessage}>
          messageTexmessageTextmessageTextmessageTextmessageTextmessageTextt
        </p>
        <p className={styles.unUserMessage}>
          messageTexmessageTextmessageTextmessageTextmessageTextmessageTextt
        </p> */}
        {messages}
      </div>
      <div className={styles.messageInpit}>
        <Search
          placeholder="input message text"
          enterButton="send"
          size="large"
          onChange={(val) => {
            setMessage(`${userData.name},${val.target.value}`);
          }}
          onSearch={() => {
            sendMessage(message);
          }}
        />
      </div>
    </>
  );
};

export default blog;