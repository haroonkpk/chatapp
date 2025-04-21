import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { LucideX } from 'lucide-react'

export default function ChateHeader() {
  const { selectedUser, setSelectedUser } = useChatStore()
  const {onlineUsers} = useAuthStore()
  return (
    <div className="p-2.5 ">
      <div className="flex items-center justify-between ">
        {/* avtar */}
        <div className=" flex items-center gap-3">
          <div className="rounded-full w-12 h-12 overflow-hidden avatar">
            <img
              src={
                selectedUser.profilePic ||
                "https://avatars.dicebear.com/api/avataaars/"
              }
              alt={selectedUser.fullName}
            />
          </div>
          {/* user detail */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-circle p-1 bg-base-300 rounded-full"
          onClick={() => setSelectedUser(null)}
        >
          <LucideX size={20} />
        </button>
      </div>
    </div>
  );
}
