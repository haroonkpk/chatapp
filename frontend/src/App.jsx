import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HoemPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import {ImageOff, Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar.jsx';
import { useThemesStore } from './store/useThemesStore.js';

function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemesStore();

  useEffect(() => {
    checkAuth();
  }
  , [ checkAuth ]);

  console.log({authUser});
  console.log({onlineUsers});

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader className="size-10 animate-spin duration-100" />
      </div>
    ); 

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App