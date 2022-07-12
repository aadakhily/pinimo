import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home/index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
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