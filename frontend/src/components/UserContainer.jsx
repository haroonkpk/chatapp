import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export default function UserContainer() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <p>Loading....</p>;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto w-full py-3">
      {users.map((user) => (
        <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
            selectedUser?._id === user._id
              ? "bg-base-300 ring-1 ring-base-300"
              : ""
          }`}
        >
          <div className="relative ">
            <img
              src={
                user.profilePic || "https://avatars.dicebear.com/api/avataaars/"
              }
              alt={user.name}
              className="size-12 object-cover rounded-full"
            />
            {onlineUsers.includes(user._id) && (
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          <div className="text-left">
            <div className="font-medium truncate">{user.fullName}</div>
            <div className="text-sm text-zinc-400">
              {onlineUsers.includes(user._id) ? "Online" : "Offline"}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
