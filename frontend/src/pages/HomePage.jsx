import React from "react";
import { useChatStore } from "../store/useChatStore";
import UserContainer from "../components/UserContainer";
import ChatContainer from "../components/chatContainer";

export default function HomePage() {
  const { selectedUser } = useChatStore();
 
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-base-200 flex items-center justify-center">
      <div className="bg-base-100 w-full max-w-6xl h-full rounded-lg shadow-cl flex">
        {!selectedUser ? <UserContainer /> : <ChatContainer />}
      </div>
    </div>
  );
}
