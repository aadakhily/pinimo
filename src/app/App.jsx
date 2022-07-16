// import { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NewPin from '@/pages/NewPin';
import UserPage from "@/pages/User";
import Setting from "@/pages/Setting";
import PinPage from '@/pages/PinPage';
import Register from "@/pages/Register";
import BookmarkPage from "@/pages/Bookmark";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/new-pin" element={<NewPin />} />

        <Route path="/pin/:pinId" element={<PinPage />} />

        <Route path="/user/:userId" element={<UserPage />} />

        <Route path="/bookmarks" element={<BookmarkPage />} />
        
        <Route path="/setting" element={<Setting />} />

        <Route path="/*" element={<Home />} />
      </Routes>

      <ToastContainer position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover />
    </>
  )
}

export default App