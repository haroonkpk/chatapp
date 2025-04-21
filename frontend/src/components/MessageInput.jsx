import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, SendHorizonal, X } from "lucide-react";
import toast from "react-hot-toast";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to send message 2", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className=" flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-2 w-5 h-5 p-1 bg-base-300 rounded-full"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            className="input input-bordered w-full input-sm sm:input-md"
            placeholder="Type a message...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zink-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <SendHorizonal size={22} />
        </button>
      </form>
    </div>
  );
}
