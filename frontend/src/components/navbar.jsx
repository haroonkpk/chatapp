import { Menu, X, User, Settings, LogOut, MessageCircle, Settings2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { THEMES } from "../constants";
import { useThemesStore } from "../store/useThemesStore.js";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const { setTheme } = useThemesStore();

  return (
    <div className="flex justify-center bg-base-200">
      <nav className=" w-full max-w-6xl bg-base-100 p-2 rounded-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <button
                variant="ghost"
                className=" flex items-center space-x-2 btn"
              >
                <MessageCircle size={20} /> <span>Messages2</span>
              </button>
            </Link>
          </div>

          {/* Right Side */}
          <div className=" flex items-center  ">
            <div className="dropdown dropdown-end mr-3  ">
              <label tabIndex={0} className="btn">
                <Settings2Icon size={20} />
                <span className="hidden sm:block">Themes</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content max-h-90 overflow-y-auto gap-2 grid grid-cols-1 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {THEMES.map((theme) => (
                  <li key={theme}>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-300"
                      onClick={() => setTheme(theme)}
                    >
                      {theme}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {authUser && (
              <>
                <Link to="/profile">
                  <button
                    variant="ghost"
                    className="flex items-center space-x-2 btn mr-2.5"
                  >
                    <User size={20} />{" "}
                    <span className="hidden sm:block">Profile</span>
                  </button>
                </Link>
                <button
                  onClick={logout}
                  variant="ghost"
                  className="flex items-center space-x-2 text-red-500 btn"
                >
                  <LogOut size={20} />{" "}
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
