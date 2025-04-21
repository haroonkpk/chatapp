import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectImage, setSelectImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex bg-base-200 justify-center items-start pt-5 sm:pt-0 h-screen ">
      <div className="bg-base-100 flex rounded-xl items-center justify-center w-full max-w-6xl">
        <div className=" shadow-lg rounded-xl p-6 w-2xl text-center border border-gray-700">
          <h2 className="text-2xl font-bold mb-2">Profile</h2>
          <p className="text-gray-400 mb-4">Your Profile Information</p>

          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={
                selectImage ||
                authUser.profilePic ||
                "https://avatars.dicebear.com/api/avataaars/"
              }
              className="w-full h-full object-cover rounded-full border-4 border-gray-600"
            />
            <label
              htmlFor="file-upload"
              className={`absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer text-white shadow-lg hover:bg-blue-600 transition ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera size={20} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </div>

          <p className="text-gray-400">
            {isUpdatingProfile
              ? "Updating Profile..."
              : "Click the camera icon and update your profile image"}
          </p>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 border border-gray-700 rounded-lg text-left">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex  items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <p className="px-4 py-2.5 border border-gray-700 rounded-lg text-left">
                {authUser?.email}
              </p>
            </div>

            <div className="space-y-1.5">
              <h2> Account Information </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700 ">
                  <span>Member since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex justify-between items-center py-2 ">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
