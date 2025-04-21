import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {login, isLoggingIn} = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handlesubmit = async (e) => {
    e.preventDefault();
    login(formData);
    
  }
  return (
    <div className="h-[calc(100vh-3.5rem)] justify-center items-center bg-base-200 flex flex-col sm:flex-row">
      <div className=" flex flex-col sm:w-6xl bg-base-100 justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8  text-center mb-8">
          {/* form */}
          <form onSubmit={handlesubmit} className="space-y-6">
            <h1 className="text-3xl font-bold">Login</h1>

            <label className="input ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="haroon@gmail.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>

            <label className="input ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </label>

            <button
              className="btn btn-accent min-w-[3rem] max-w-full w-[20rem] mx-auto"
              onClick={handlesubmit}
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader className=" size-5 animate-spin " />
                  LoggingIn...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-accent">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
