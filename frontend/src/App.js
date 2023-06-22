import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import MessagePage from "scenes/messagePage";
import ProfilePage from "scenes/profilePage";

import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const isAuth = Boolean(useSelector((st) => st.token))
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={isAuth? <HomePage /> : <Navigate to="/"/>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
