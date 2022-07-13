import { useContext, useEffect } from 'react';
import { Routes, Route  , useNavigate} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "../pages/Home/index";
import Login from "../pages/Login";
import Register from "../pages/Register";

import authContext from '../context/auth';

const App = () => {
  const navigate = useNavigate()

  const { loadTokenAndUser, token } = useContext(authContext)

  useEffect(() => {
    loadTokenAndUser()
    
    if (!token) return navigate('/login', { replace: true })
  }, [token])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Login />} />
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