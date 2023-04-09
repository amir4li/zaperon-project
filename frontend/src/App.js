import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = Boolean(useSelector((state)=> state.user));

  return (
    <BrowserRouter>
      <div className="app">
      <Routes>
        <Route path="/" element={ isLoggedIn ? <HomePage /> : <LoginPage /> }/>
        <Route path="/login" element={ <LoginPage  /> }/>
        <Route path="/signup" element={ <SignupPage /> }/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
