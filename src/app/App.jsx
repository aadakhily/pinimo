import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home/inde";
import Login from "../pages/Login";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Login />} />
    </Routes>
    // <h1>this is our front end</h1>
  )
}

export default App