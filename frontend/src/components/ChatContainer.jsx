import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Loader } from "lucide-react";
import ChateHeader from "./ChateHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utlis";

export default function ChatContainer() {
  const {
    selectedUser,
    getMessages,
    isMessagesLoading,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = React.useRef(null);

  useEffect(()=>{
    if(messagesEndRef.current && messages.length > 0){

      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

  },[messages]);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Loader className="size-7 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-16 shadow-md z-10">
        <ChateHeader />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`} ref={messagesEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic
                      : selectedUser.profilePic
                  }
                  alt={"user image"}
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">
                {formatTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="rounded-lg w-48 h-auto object-cover"
                />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit shadow-md z-11">
        <MessageInput />
      </div>
    </div>
  );
}
